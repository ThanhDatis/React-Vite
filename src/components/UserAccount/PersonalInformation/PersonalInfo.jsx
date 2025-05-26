import React, { useState } from 'react';
import './PersonalInfo.css';


// Validation rules
const validateForm = (data) => {
    const errors = {};
    
    // Full Name validation
    if (!data.fullName.trim()) {
        errors.fullName = 'Họ và tên không được để trống';
    } else if (data.fullName.trim().length < 2) {
        errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
        errors.email = 'Email không được để trống';
    } else if (!emailRegex.test(data.email)) {
        errors.email = 'Email không hợp lệ';
    }
    
    // Phone validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!data.phone) {
        errors.phone = 'Số điện thoại không được để trống';
    } else if (!phoneRegex.test(data.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    // Gender validation
    if (!data.gender) {
        errors.gender = 'Vui lòng chọn giới tính';
    }
    
    // Birth Date validation
    if (!data.birthDate) {
        errors.birthDate = 'Ngày sinh không được để trống';
    } else {
        const birthDate = new Date(data.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            errors.birthDate = 'Bạn phải đủ 18 tuổi';
        } else if (age > 100) {
            errors.birthDate = 'Ngày sinh không hợp lệ';
        }
    }
    
    return errors;
};

// Components for each section
const PersonalInfo = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        birthDate: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        
        // Clear submit status when form is modified
        setSubmitStatus('');
        
        if (name === 'gender' && type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked ? value : ''
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitStatus('error');
            return;
        }
        
        setIsLoading(true);
        setSubmitStatus('');
        
        // Simulate API call //custom hook, re-render component//
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            // You would typically make your API call here
        } catch (error) {
            setSubmitStatus('error');
            setErrors({ submit: 'Có lỗi xảy ra. Vui lòng thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAvatarChange = () => {
        // Handle avatar change logic
        console.log('Change avatar clicked');
        // You can implement file upload logic here
    };

    return (
        <div className="personal-info-section">
            <h2>Personal Information</h2>
            
            {/* Show success message */}
            {submitStatus === 'success' && (
                <div className="message-container success">
                    <span className="message-icon">✓</span>
                    Cập nhật thông tin thành công!
                </div>
            )}
            
            {/* Show submit error if any */}
            {errors.submit && (
                <div className="message-container error">
                    <span className="message-icon">!</span>
                    {errors.submit}
                </div>
            )}
            
            <div className="personal-info-container">
                {/* Left Column - Avatar */}
                <div className="avatar-section">
                    <div className="avatar-wrapper">
                        <img 
                            src="" 
                            alt="" 
                            className="avatar-image"
                        />
                    </div>
                    <button 
                        type="button"
                        className="change-avatar-btn"
                        onClick={handleAvatarChange}
                    >
                        Change Avatar
                    </button>
                </div>

                {/* Right Column - Form */}
                <div className="info-form-section">
                    <form className={`info-form-personal ${isLoading ? 'loading' : ''}`} onSubmit={handleSubmit}>
                        <div className={`form-group-personal ${errors.fullName ? 'error' : ''}`}>
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName" 
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                        </div>

                        <div className={`form-group-personal ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className={`form-group-personal ${errors.phone ? 'error' : ''}`}>
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>

                        <div className={`form-group-personal gender-group ${errors.gender ? 'error' : ''}`}>
                            <label className="group-label">Gender</label>
                            <div className="checkbox-group">
                                <div className="checkbox-item">
                                    <input 
                                        type="checkbox" 
                                        id="male" 
                                        name="gender" 
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleInputChange}
                                    />
                                    <label className="checkbox-label" htmlFor="male">Nam</label>
                                </div>
                                <div className="checkbox-item">
                                    <input 
                                        type="checkbox" 
                                        id="female" 
                                        name="gender" 
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleInputChange}
                                    />
                                    <label className="checkbox-label" htmlFor="female">Nữ</label>
                                </div>
                                <div className="checkbox-item">
                                    <input 
                                        type="checkbox" 
                                        id="other" 
                                        name="gender" 
                                        value="other"
                                        checked={formData.gender === 'other'}
                                        onChange={handleInputChange}
                                    />
                                    <label className="checkbox-label" htmlFor="other">Khác</label>
                                </div>
                            </div>
                            {errors.gender && <span className="error-message">{errors.gender}</span>}
                        </div>

                        <div className={`form-group-personal ${errors.birthDate ? 'error' : ''}`}>
                            <label htmlFor="birthDate">Birth Date</label>
                            <input 
                                type="date" 
                                id="birthDate" 
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                            {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="update-info-btn-container">
                <button 
                    type="submit" 
                    className={`update-info-btn ${submitStatus}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Update Information'}
                </button>
            </div>
        </div>
    );
};

export default PersonalInfo;
