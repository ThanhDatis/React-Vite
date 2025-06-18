import React, { useState, useEffect } from 'react';
import './PaymentMethod.css';

const PaymentMethod = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editingMethod, setEditingMethod] = useState(null);
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardType: '',
        isDefault: false
    });

    // Mock data cho phương thức thanh toán có sẵn
    useEffect(() => {
        const mockPaymentMethods = [
            {
                id: 1,
                cardNumber: '**** **** **** 1234',
                cardHolderName: 'NGUYEN VAN A',
                expiryMonth: '12',
                expiryYear: '2027',
                cardType: 'visa',
                isDefault: true,
                fullCardNumber: '4111111111111234' // Chỉ để demo, thực tế không lưu
            },
            {
                id: 2,
                cardNumber: '**** **** **** 5678',
                cardHolderName: 'NGUYEN VAN A',
                expiryMonth: '08',
                expiryYear: '2026',
                cardType: 'mastercard',
                isDefault: false,
                fullCardNumber: '5555555555555678'
            }
        ];
        setPaymentMethods(mockPaymentMethods);
    }, []);

    // Detect card type based on card number
    const detectCardType = (cardNumber) => {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        const amexRegex = /^3[47][0-9]{13}$/;
        
        const cleanNumber = cardNumber.replace(/\s/g, '');
        
        if (visaRegex.test(cleanNumber)) return 'visa';
        if (mastercardRegex.test(cleanNumber)) return 'mastercard';
        if (amexRegex.test(cleanNumber)) return 'amex';
        return '';
    };

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const cleanValue = value.replace(/\s/g, '');
        const groups = cleanValue.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cleanValue;
    };

    // Mask card number for display
    const maskCardNumber = (cardNumber) => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        if (cleanNumber.length < 4) return cardNumber;
        const lastFour = cleanNumber.slice(-4);
        return `**** **** **** ${lastFour}`;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'cardNumber') {
            const formattedValue = formatCardNumber(value);
            if (formattedValue.replace(/\s/g, '').length <= 16) {
                setFormData(prev => ({
                    ...prev,
                    [name]: formattedValue,
                    cardType: detectCardType(formattedValue)
                }));
            }
        } else if (name === 'cvv') {
            if (value.length <= 4 && /^\d*$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === 'cardHolderName') {
            const upperValue = value.toUpperCase();
            setFormData(prev => ({ ...prev, [name]: upperValue }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.cardNumber || !formData.cardHolderName || 
            !formData.expiryMonth || !formData.expiryYear || !formData.cvv) {
            alert('Vui lòng điền đầy đủ thông tin thẻ!');
            return;
        }

        if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
            alert('Số thẻ phải có 16 chữ số!');
            return;
        }

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        
        if (parseInt(formData.expiryYear) < currentYear || 
            (parseInt(formData.expiryYear) === currentYear && parseInt(formData.expiryMonth) < currentMonth)) {
            alert('Thẻ đã hết hạn!');
            return;
        }

        if (editingMethod) {
            // Update existing method
            setPaymentMethods(prev => prev.map(method => 
                method.id === editingMethod.id 
                    ? {
                        ...method,
                        cardNumber: maskCardNumber(formData.cardNumber),
                        cardHolderName: formData.cardHolderName,
                        expiryMonth: formData.expiryMonth,
                        expiryYear: formData.expiryYear,
                        cardType: formData.cardType,
                        isDefault: formData.isDefault,
                        fullCardNumber: formData.cardNumber.replace(/\s/g, '')
                      }
                    : formData.isDefault ? { ...method, isDefault: false } : method
            ));
        } else {
            // Add new method
            const newMethod = {
                id: Date.now(),
                cardNumber: maskCardNumber(formData.cardNumber),
                cardHolderName: formData.cardHolderName,
                expiryMonth: formData.expiryMonth,
                expiryYear: formData.expiryYear,
                cardType: formData.cardType,
                isDefault: formData.isDefault,
                fullCardNumber: formData.cardNumber.replace(/\s/g, '')
            };

            if (formData.isDefault) {
                setPaymentMethods(prev => [
                    ...prev.map(method => ({ ...method, isDefault: false })),
                    newMethod
                ]);
            } else {
                setPaymentMethods(prev => [...prev, newMethod]);
            }
        }

        handleClosePopup();
    };

    const handleEdit = (method) => {
        setEditingMethod(method);
        setFormData({
            cardNumber: method.fullCardNumber ? formatCardNumber(method.fullCardNumber) : '',
            cardHolderName: method.cardHolderName,
            expiryMonth: method.expiryMonth,
            expiryYear: method.expiryYear,
            cvv: '',
            cardType: method.cardType,
            isDefault: method.isDefault
        });
        setShowPopup(true);
    };

    const handleDelete = (methodId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phương thức thanh toán này?')) {
            setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
        }
    };

    const handleSetDefault = (methodId) => {
        setPaymentMethods(prev => prev.map(method => ({
            ...method,
            isDefault: method.id === methodId
        })));
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditingMethod(null);
        setFormData({
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            cardType: '',
            isDefault: false
        });
    };

    const getCardIcon = (cardType) => {
        switch (cardType) {
            case 'visa':
                return '💳'; // Trong thực tế sẽ dùng icon/logo Visa
            case 'mastercard':
                return '💳'; // Logo Mastercard
            case 'amex':
                return '💳'; // Logo American Express
            default:
                return '💳';
        }
    };

    const getCardTypeText = (cardType) => {
        switch (cardType) {
            case 'visa': return 'Visa';
            case 'mastercard': return 'Mastercard';
            case 'amex': return 'American Express';
            default: return 'Credit Card';
        }
    };

    // Generate year options (current year + 10 years)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear + i);

    return (
        <div className="payment-method">
            <div className="payment-header">
                <h2>Phương thức thanh toán</h2>
                <button 
                    className="add-payment-btn"
                    onClick={() => setShowPopup(true)}
                >
                    + Thêm thẻ mới
                </button>
            </div>

            <div className="payment-list">
                {paymentMethods.length === 0 ? (
                    <div className="no-payment">
                        <p>Chưa có phương thức thanh toán nào. Hãy thêm thẻ đầu tiên!</p>
                    </div>
                ) : (
                    paymentMethods.map((method) => (
                        <div key={method.id} className="payment-card">
                            <div className="card-info">
                                <div className="card-visual">
                                    <div className="card-icon">
                                        {getCardIcon(method.cardType)}
                                    </div>
                                    <div className="card-details">
                                        <div className="card-number">{method.cardNumber}</div>
                                        <div className="card-holder">{method.cardHolderName}</div>
                                        <div className="card-expiry">
                                            Hết hạn: {method.expiryMonth}/{method.expiryYear}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-labels">
                                    <span className={`card-type ${method.cardType}`}>
                                        {getCardTypeText(method.cardType)}
                                    </span>
                                    {method.isDefault && (
                                        <span className="default-label">Mặc định</span>
                                    )}
                                </div>
                            </div>
                            <div className="card-actions">
                                {!method.isDefault && (
                                    <button 
                                        className="set-default-btn"
                                        onClick={() => handleSetDefault(method.id)}
                                    >
                                        Đặt làm mặc định
                                    </button>
                                )}
                                <button 
                                    className="edit-btn"
                                    onClick={() => handleEdit(method)}
                                >
                                    Sửa
                                </button>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(method.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Popup Add/Edit Payment Method */}
            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <h3>{editingMethod ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới'}</h3>
                            <button className="close-btn" onClick={handleClosePopup}>×</button>
                        </div>
                        
                        <form className="payment-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Số thẻ *</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                />
                                {formData.cardType && (
                                    <span className="detected-card-type">
                                        {getCardTypeText(formData.cardType)} được phát hiện
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Tên chủ thẻ *</label>
                                <input
                                    type="text"
                                    name="cardHolderName"
                                    value={formData.cardHolderName}
                                    onChange={handleInputChange}
                                    placeholder="NGUYEN VAN A"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tháng hết hạn *</label>
                                    <select
                                        name="expiryMonth"
                                        value={formData.expiryMonth}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Tháng</option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                            <option key={month} value={month.toString().padStart(2, '0')}>
                                                {month.toString().padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Năm hết hạn *</label>
                                    <select
                                        name="expiryYear"
                                        value={formData.expiryYear}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Năm</option>
                                        {yearOptions.map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>CVV *</label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkmark"></span>
                                    Đặt làm phương thức thanh toán mặc định
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
                                    {editingMethod ? 'Cập nhật' : 'Lưu thẻ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;