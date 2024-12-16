import React, { memo } from 'react';

export const FooterTemplate = memo(() => {
    return (
        <footer className="text-white bg-gray-800 absolute bottom-0 w-full">
            <div className="container mx-auto text-center">
                <p className="text-sm md:text-base font-light">
                    &copy; {new Date().getFullYear()} PlanTrek. All rights reserved.
                </p>
            </div>
        </footer>
    );
});
