 import { useEffect } from "react";
 import { useLocation } from "react-router-dom";

 export const useScrollToTop = (options = {}) => {
    const location = useLocation();
    const {
        behavior = 'smooth',
        delay = 0, 
        offset = 0,
        excludePaths = []
    } = options;

    useEffect(() => {
        if (excludePaths.includes(location.pathname)) return;

        const scrollToTop = () => {
            window.scrollTo({
                top: offset,
                left: 0,
                behavior
            });
        };

        if (delay > 0) {
            const timer = setTimeout(scrollToTop, delay);
            return () => clearTimeout(timer);
        } else {
            scrollToTop();
        }
    }, [location.pathname, behavior, delay, offset, excludePaths]);
 };
