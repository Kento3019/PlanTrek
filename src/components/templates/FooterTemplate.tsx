import React, { memo } from 'react';

export const FooterTemplate = memo(() => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm md:text-base font-light">
                    &copy; {new Date().getFullYear()} PlanTrek. All rights reserved.
                </p>
                {/* オプションで追加したいリンクやアイコン */}
                <div className="mt-2 flex justify-center space-x-6">
                    <a href="https://github.com" className="text-white hover:text-gray-300 transition-all" target="_blank" rel="noopener noreferrer">
                        <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2c-5.522 0-10 4.478-10 10 0 4.418 2.868 8.166 6.84 9.458.5.092.68-.217.68-.485v-1.67c-2.412.526-2.928-1.161-2.928-1.161-.397-.987-.971-1.25-.971-1.25-.794-.545.06-.535.06-.535 1.03.072 1.573 1.066 1.573 1.066 1.014 1.727 2.655 1.225 3.295.935.102-.734.397-1.225.727-1.5-2.407-.27-4.937-1.196-4.937-5.312 0-1.173.418-2.124 1.105-2.867-.112-.27-.479-.682-.106-1.053 0 0 .843-.268 2.778 1.02 1.81-.503 3.745-.504 5.544 0 1.934-1.288 2.776-1.02 2.776-1.02-.373.371-.006.784.106 1.053.687.743 1.105 1.694 1.105 2.867 0 4.119-2.537 5.039-4.945 5.312.409.357.772 1.07.772 2.155v3.21c0 .268.18.577.68.485 3.975-1.292 6.84-5.04 6.84-9.458 0-5.522-4.478-10-10-10z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
});
