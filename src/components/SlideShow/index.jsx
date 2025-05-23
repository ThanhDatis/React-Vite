import React from 'react';
import './SlideShow.css';
import SlideShowContent from './SlideShowContent';
 
export default function SlideShow({ currentSlide, setCurrentSlide }) {
    return <SlideShowContent currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />;
} 