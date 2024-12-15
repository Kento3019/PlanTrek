import { useState } from 'react';

export const useFAB = () => {
    const [isOpenFAB, setIsOpenFAB] = useState(false);

    const toggleFAB = () => setIsOpenFAB((prev) => !prev);

    return { isOpenFAB, toggleFAB };
};
