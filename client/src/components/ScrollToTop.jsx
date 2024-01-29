import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathName } = useLocation();
    useEffect(() => {
        window.scrollTo(100, 100);
    }, [pathName])

    return null;
}

export default ScrollToTop;