import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
        if (e.target === ref.current) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useOutsideClick;
