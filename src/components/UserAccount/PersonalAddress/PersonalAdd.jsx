import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PersonalAdd.css';

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        province: '',
        district: '',
        ward: '',
        specificAddress: '',
        addressType: 'home',
        isDefault: false
    });

    // Fetch tỉnh/thành phố
    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/p/');
            setProvinces(response.data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    // Fetch quận/huyện theo tỉnh/thành phố
    const fetchDistricts = async (provinceCode) => {
        if (!provinceCode) {
            setDistricts([]);
            return;
        }
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            setDistricts(response.data.districts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    // Fetch phường/xã theo quận/huyện
    const fetchWards = async (districtCode) => {
        if (!districtCode) {
            setWards([]);
            return;
        }
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            setWards(response.data.wards);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    // Load tỉnh/thành phố khi component mount
    useEffect(() => {
        fetchProvinces();
    }, []);

    // Load quận/huyện khi chọn tỉnh/thành phố
    useEffect(() => {
        if (formData.province) {
            const selectedProvince = provinces.find(p => p.name === formData.province);
            if (selectedProvince) {
                fetchDistricts(selectedProvince.code);
                // Chỉ reset quận/huyện và phường/xã khi không phải đang edit
                if (!editMode) {
                    setFormData(prev => ({
                        ...prev,
                        district: '',
                        ward: ''
                    }));
                }
            }
        }
    }, [formData.province, provinces, editMode]);

    // Load phường/xã khi chọn quận/huyện
    useEffect(() => {
        if (formData.district) {
            const selectedDistrict = districts.find(d => d.name === formData.district);
            if (selectedDistrict) {
                fetchWards(selectedDistrict.code);
                // Chỉ reset phường/xã khi không phải đang edit
                if (!editMode) {
                    setFormData(prev => ({
                        ...prev,
                        ward: ''
                    }));
                }
            }
        }
    }, [formData.district, districts, editMode]);

    // Mock data cho địa chỉ có sẵn
    useEffect(() => {
        const mockAddresses = [
            {
                id: 1,
                fullName: 'Nguyễn Văn A',
                phoneNumber: '0901234567',
                province: 'TP. Hồ Chí Minh',
                district: 'Quận 1',
                ward: 'Phường Bến Nghé',
                specificAddress: '123 Đường Lê Lợi',
                addressType: 'home',
                isDefault: true
            },
            {
                id: 2,
                fullName: 'Nguyễn Văn A',
                phoneNumber: '0901234567',
                province: 'TP. Hồ Chí Minh',
                district: 'Quận 3',
                ward: 'Phường Võ Thị Sáu',
                specificAddress: '456 Đường Cách Mạng Tháng 8',
                addressType: 'office',
                isDefault: false
            }
        ];
        setAddresses(mockAddresses);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEdit = async (address) => {
        setEditMode(true);
        setEditAddressId(address.id);
        
        // Fetch provinces trước
        try {
            const provincesResponse = await axios.get('https://provinces.open-api.vn/api/p/');
            const allProvinces = provincesResponse.data;
            setProvinces(allProvinces);
            
            // Tìm province code từ tên tỉnh/thành phố
            const selectedProvince = allProvinces.find(p => p.name === address.province);
            if (selectedProvince) {
                // Fetch districts của province đã chọn
                const districtsResponse = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`);
                const allDistricts = districtsResponse.data.districts;
                setDistricts(allDistricts);

                // Tìm district code từ tên quận/huyện
                const selectedDistrict = allDistricts.find(d => d.name === address.district);
                if (selectedDistrict) {
                    // Fetch wards của district đã chọn
                    const wardsResponse = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
                    setWards(wardsResponse.data.wards);
                }
            }
        } catch (error) {
            console.error('Error fetching address data:', error);
        }

        // Set form data sau khi đã fetch đủ dữ liệu
        setFormData({
            fullName: address.fullName,
            phoneNumber: address.phoneNumber,
            province: address.province,
            district: address.district,
            ward: address.ward,
            specificAddress: address.specificAddress,
            addressType: address.addressType,
            isDefault: address.isDefault
        });
        
        setShowPopup(true);
    };

    const handleDelete = (addressId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            setAddresses(prev => {
                const updatedAddresses = prev.filter(addr => addr.id !== addressId);
                // Nếu địa chỉ bị xóa là mặc định và còn địa chỉ khác, set địa chỉ đầu tiên làm mặc định
                const deletedAddress = prev.find(addr => addr.id === addressId);
                if (deletedAddress?.isDefault && updatedAddresses.length > 0) {
                    updatedAddresses[0].isDefault = true;
                }
                return updatedAddresses;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.fullName || !formData.phoneNumber || !formData.province || 
            !formData.district || !formData.ward || !formData.specificAddress) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (editMode) {
            // Cập nhật địa chỉ đang chỉnh sửa
            setAddresses(prev => {
                const updatedAddresses = prev.map(addr => {
                    if (addr.id === editAddressId) {
                        return {
                            ...formData,
                            id: editAddressId
                        };
                    }
                    // Nếu địa chỉ mới là mặc định, cập nhật các địa chỉ khác
                    if (formData.isDefault) {
                        return {
                            ...addr,
                            isDefault: false
                        };
                    }
                    return addr;
                });
                return updatedAddresses;
            });
        } else {
            // Tạo địa chỉ mới
            const newAddress = {
                id: Date.now(),
                ...formData
            };

            // Nếu địa chỉ mới là mặc định, cập nhật các địa chỉ khác
            if (formData.isDefault) {
                setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
            }

            setAddresses(prev => [...prev, newAddress]);
        }
        handleClosePopup();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditMode(false);
        setEditAddressId(null);
        setFormData({
            fullName: '',
            phoneNumber: '',
            province: '',
            district: '',
            ward: '',
            specificAddress: '',
            addressType: 'home',
            isDefault: false
        });
    };

    const getAddressTypeText = (type) => {
        return type === 'home' ? 'Nhà riêng' : 'Văn phòng';
    };

    const formatFullAddress = (address) => {
        return `${address.specificAddress}, ${address.ward}, ${address.district}, ${address.province}`;
    };

    return (
        <div className="personal-address">
            <div className="address-header">
                <h2>My Address</h2>
                <button 
                    className="add-address-btn"
                    onClick={() => setShowPopup(true)}
                >
                    + Add New Address
                </button>
            </div>

            <div className="address-list">
                {addresses.length === 0 ? (
                    <div className="no-address">
                        <p>Chưa có địa chỉ nào. Hãy thêm địa chỉ đầu tiên!</p>
                    </div>
                ) : (
                    addresses.map((address) => (
                        <div key={address.id} className="address-card">
                            <div className="address-info">
                                <div className="name-phone">
                                    <span className="name">{address.fullName}</span>
                                    <span className="phone">{address.phoneNumber}</span>
                                </div>
                                <div className="address-details">
                                    {formatFullAddress(address)}
                                </div>
                                <div className="address-labels">
                                    <span className={`type-label ${address.addressType}`}>
                                        {getAddressTypeText(address.addressType)}
                                    </span>
                                    {address.isDefault && (
                                        <span className="default-label">Mặc định</span> 
                                    )}
                                </div>
                            </div>
                            <div className="address-actions">
                                <button className="edit-btn" onClick={() => handleEdit(address)}>Sửa</button>
                                <button className="delete-btn" onClick={() => handleDelete(address.id)}>Xóa</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Popup Add New Address */}
            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <h3>Add New Address</h3>
                            <button className="close-btn" onClick={handleClosePopup}>×</button>
                        </div>
                        
                        <form className="address-form" onSubmit={handleSubmit}>
                            <div className="form-row-address">
                                <div className="form-group-address">
                                    <label>Họ tên người nhận *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Nhập họ tên"
                                        required
                                    />
                                </div>
                                <div className="form-group-address">
                                    <label>Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Nhập số điện thoại"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row-address">
                                <div className="form-group-address">
                                    <label>Tỉnh/Thành phố *</label>
                                    <select
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn Tỉnh/Thành phố</option>
                                        {provinces.map(province => (
                                            <option key={province.code} value={province.name}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group-address">
                                    <label>Quận/Huyện *</label>
                                    <select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!formData.province}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map(district => (
                                            <option key={district.code} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row-address">
                                <div className="form-group-address">
                                    <label>Phường/Xã *</label>
                                    <select
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!formData.district}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map(ward => (
                                            <option key={ward.code} value={ward.name}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row-address">
                                <div className="form-group-address">
                                    <label>Địa chỉ cụ thể *</label>
                                    <input
                                        type="text"
                                        name="specificAddress"
                                        value={formData.specificAddress}
                                        onChange={handleInputChange}
                                        placeholder="Nhập số nhà, tên đường..."
                                        required
                                    />
                                </div>

                                <div className="form-group-address">
                                    <label>Loại địa chỉ</label>
                                    <select
                                        name="addressType"
                                        value={formData.addressType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="home">Nhà riêng</option>
                                        <option value="office">Văn phòng</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group-address checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkmark"></span>
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>

                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={handleClosePopup}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="save-btn">
                                    Lưu địa chỉ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Address;
