import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Box,
    IconButton,
    Paper,
    useTheme,
    Fade,
    Stack
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    Circle,
    CircleOutlined
} from '@mui/icons-material';

const NavigationButton = React.memo(({ direction, onClick, sx }) => {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

    return (
        <IconButton
            onClick={onClick}
            sx={sx}
            aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
        >
            <Icon fontSize="large" />
        </IconButton>
    );
});

const DotIndicator = React.memo(({ index, isActive, onClick }) => {
    return (
        <IconButton 
            onClick={onClick}
            size="small"
            aria-label={`Go to slide ${index}`}
            sx={{
                p: 0.5,
                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                    color: 'white',
                    transform: 'scale(1.2)'
                },
                transition: 'all 0.2s ease-in-out'
            }}
        >
            {isActive ? (
                <Circle sx={{ fontSize: 12 }} />
            ) : (
                <CircleOutlined sx={{ fontSize: 12 }} />
            )}
        </IconButton>
    );
});

export default function SlideShowContent() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const theme = useTheme();

    const slides = useMemo(() => [
        { id: 1, src: "/src/assets/images/image.png", alt: "Slide 1" },
        { id: 2, src: "/src/assets/images/image.png", alt: "Slide 2" },
        { id: 3, src: "/src/assets/images/image.png", alt: "Slide 3" }
    ],[]);

    const totalSlides = slides.length;

    //memoized style objects
    const containerStyles = useMemo(() => ({
        position: 'relative',
        width: '100%',
        maxWidth: 1300,
        margin: '0 auto',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.shadows[4]
    }), [theme.shadows]);

    const slideContainerStyles = useMemo(() => ({
        position: 'relative',
        width: '100%',
        height: { xs: 300, sm: 400, md: 500 },
        bgcolor: 'grey.100'
    }), []);

    const prevButtonStyles = useMemo(() => ({
        position: 'absolute',
        top: '50%',
        left: 16,
        transform: 'translateY(-50%)',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        color: 'grey.800',
        width: 48,
        height: 48,
        '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-50%) scale(1.1)'
        },
        transition: 'all 0.2s ease-in-out'
    }), []);

    const nextButtonStyles = useMemo(() => ({
        position: 'absolute',
        top: '50%',
        right: 16,
        transform: 'translateY(-50%)',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        color: 'grey.800',
        width: 48,
        height: 48,
        '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-50%) scale(1.1)'
        },
        transition: 'all 0.2s ease-in-out'
    }), []);

    const dotContainerStyles = useMemo(() => ({
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        bgcolor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 3,
        p: 1
    }), []);

    
    const plusSlides = useCallback((n) => {
        setSlideIndex (prev => {
            let newIndex = prev + n;
            if (newIndex > totalSlides) newIndex = 1;
            if (newIndex < 1) newIndex = totalSlides;
            return newIndex;
        });
    }, [totalSlides]);

    const goToSlide = useCallback((n) => {
        setSlideIndex(n);
    }, []);

    const handleKeyDown = useCallback((event) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                plusSlides(-1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                plusSlides(1);
                break;
            case ' ':
                event.preventDefault();
                setIsPaused(prev => !prev);
                break;
            case 'Home':
                event.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                event.preventDefault();
                goToSlide(totalSlides);
                break;
            default:
                break;
        }
    }, [plusSlides, goToSlide, totalSlides]);

    const handleMouseEnter = useCallback(() => {
        setIsPaused(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsPaused(false);
    }, []);

    useEffect(() => {
        if (!isPaused) return;

        const interval = setInterval(() => {
            setSlideIndex(prev => (prev % totalSlides) + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, totalSlides]);

    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            if (document.activeElement?.closest('[role="region"]')) {
                handleKeyDown(event);
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleKeyDown]);

    return (
        <Box
            sx={containerStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Image slideshow"
            aria-live="polite"
            aria-roledescription="carousel"
        >
            <Box sx={slideContainerStyles} >
                {slides.map((slide) => (
                    <Fade
                        key={slide.id}
                        in={slideIndex === slide.id}
                        timeout={500}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: slideIndex === slide.id ? 'block' : 'none'
                            }}
                            role="img"
                            aria-label={slide.alt}
                        >
                            <Box
                                component="img"
                                src={slide.src}
                                alt={slide.alt}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                                aria-hidden="true"
                            />
                        </Box>
                    </Fade>
                ))}
            </Box>

            <Box 
                sx={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
                aria-label='polite'
                aria-atomic='true'
            >
                Slide {slideIndex} of {totalSlides}
            </Box>

            {/* Previous Button */}
            <NavigationButton
                direction="prev"
                onClick={() => plusSlides(-1)}
                sx={prevButtonStyles}
            />

            {/* Next Button */}
            <NavigationButton
                direction="next"
                onClick={() => plusSlides(1)}
                sx={nextButtonStyles}
            />

            {/* Dots Indicator */}
            <Box 
                sx={dotContainerStyles}
                role="tablist"
                aria-label="Slide navigation"
            >
                <Stack direction="row" spacing={1}>
                    {slides.map((slide) => (
                        <DotIndicator
                            key={slide.id}
                            index={slide.id}
                            isActive={slideIndex === slide.id}
                            onClick={() => goToSlide(slide.id)}
                        />
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
            >
                Use arrow keys to navigate slides, spacebar to pause/resume, Home/End to go to first/last slide
            </Box>
        </Box>
    );
}