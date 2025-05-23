import React, { useState, useEffect } from 'react';
import './SlideShow.css'

export default function SlideShowContent({ currentSlide, setCurrentSlide }) {
    const [slideIndex, setSlideIndex] = useState(1);

    const plusSlides = (n) => {
        let newIndex = slideIndex + n;
        if (newIndex > 3) newIndex = 1;
        if (newIndex < 1) newIndex = 3;
        setSlideIndex(newIndex);
    };

    const currentSlideHandler = (n) => {
        setSlideIndex(n);
    };

    useEffect(() => {
        // Auto slideshow
        const interval = setInterval(() => {
            plusSlides(1);
        }, 5000);

        return () => clearInterval(interval);
    }, [slideIndex]);

    return (
        <div className="slideshow-container">
            <div className="mySlides fade" style={{ display: slideIndex === 1 ? 'block' : 'none' }}>
                <img className="image" src="/src/assets/images/image.png" alt="Slide 1"/>
            </div>
            <div className="mySlides fade" style={{ display: slideIndex === 2 ? 'block' : 'none' }}>
                <img className="image" src="/src/assets/images/image.png" alt="Slide 2"/>
            </div>
            <div className="mySlides fade" style={{ display: slideIndex === 3 ? 'block' : 'none' }}>
                <img className="image" src="/src/assets/images/image.png" alt="Slide 3"/>
            </div>

            <a className="prev" onClick={() => plusSlides(-1)}>
                <svg className="prev-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_21410)">
                        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                        <path d="M15.5 18L9.5 12L15.5 6" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_21410">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>                
            </a>
            <a className="next" onClick={() => plusSlides(1)}>
                <svg className="next-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_19729)">
                        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                        <path d="M9.5 6L15.5 12L9.5 18" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_19729">
                            <rect width="26" height="26" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>                
            </a>

            <div className="dots-container" style={{textAlign: 'center'}}>
                <span className={`dot${slideIndex === 1 ? ' active' : ''}`} onClick={() => currentSlideHandler(1)}></span>
                <span className={`dot${slideIndex === 2 ? ' active' : ''}`} onClick={() => currentSlideHandler(2)}></span>
                <span className={`dot${slideIndex === 3 ? ' active' : ''}`} onClick={() => currentSlideHandler(3)}></span>
            </div>
        </div>
    )
} 