import React, { useState, memo } from 'react';
import { CrossIcon } from '../image/CrossIcon';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useHeaderContext } from '../provider/HeaderProvider';

const HEADER_NAME = "PlanTrek"

export const HeaderTemplate = memo(() => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { uuid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isHeaderVisible, toggleHeaderVisibility } = useHeaderContext();

    const handleHeadarDisplay = () => {
        toggleHeaderVisibility();
    }
    const isSchedulePage = location.pathname === `/${uuid}/schedule`;
    const isTransactionPage = location.pathname === `/${uuid}/transaction`;

    const handleNavigation = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        isHeaderVisible ? (
            <header className="flex items-center bg-gradient-to-r  from-indigo-600 via-purple-500 to-teal-400 text-white px-4 shadow-lg">
                {uuid && (isSchedulePage || isTransactionPage) ? (
                    <>
                        <div className="sm:hidden flex flex-row items-center justify-between w-full">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center text-sm text-gray-200 rounded-lg"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                            <h1 className="text-3xl font-bold tracking-tight">{HEADER_NAME}</h1>
                            <div className="flex items-center justify-end space-x-2 mt-1">
                                <button
                                    className="text-sm font-semibold text-white transition-all"
                                    onClick={handleHeadarDisplay}
                                >
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 14l5-5 5 5" />
                                            <path className="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5-5 5 5" />
                                        </svg>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {menuOpen && (
                            <div className="bg-gradient-to-b from-indigo-600 via-indigo-500/80 to-teal-500 fixed top-0 left-0 w-64 h-full text-white shadow-xl z-50 opacity-95 transition-transform transform sm:hidden translate-x-0">
                                <button
                                    type="button"
                                    className="absolute top-0.5 right-4 p-2 text-gray-400 hover:text-white"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className="text-white sr-only">Close menu</span>
                                    <CrossIcon className="text-white" size={40} />
                                </button>
                                <nav className="mt-16 px-4">
                                    <ul className="space-y-4">
                                        {/* <li>
                                            {isSchedulePage ? (
                                                <button
                                                    className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                                    onClick={() => handleNavigation(`../${uuid}/transaction`)}
                                                >
                                                    立替記録追加
                                                </button>
                                            ) : (
                                                <button
                                                    className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                                    onClick={() => handleNavigation(`../${uuid}/schedule`)}
                                                >
                                                    予定追加
                                                </button>
                                            )}
                                        </li> */}
                                        {/* <li>
                                            <button
                                                className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                                onClick={() => handleNavigation(`../${uuid}/user`)}
                                            >
                                                ユーザ更新
                                            </button>
                                        </li> */}
                                        <li>
                                            <button
                                                className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                                onClick={() => handleNavigation(`../${uuid}/schedule/category`)}
                                            >
                                                カテゴリー設定
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                        {/* デスクトップやタブレットサイズ以上（sm以上）では、メニューを通常の形式で表示 */}
                        <div className='hidden sm:flex flex-row items-center justify-between w-full'>
                            <h1 className="ml-2 text-3xl font-bold tracking-tight">{HEADER_NAME}</h1>
                            <div className="items-center space-x-6 mr-4">
                                <nav className="flex space-x-4">
                                    {/* {isSchedulePage ? (
                                        <button
                                            className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                            onClick={() => handleNavigation(`../${uuid}/transaction`)}
                                        >
                                            立替記録追加
                                        </button>
                                    ) : (
                                        <button
                                            className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                            onClick={() => handleNavigation(`../${uuid}/schedule`)}
                                        >
                                            予定追加
                                        </button>
                                    )} */}
                                    {/* < button
                                        className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                        onClick={() => handleNavigation(`../${uuid}/user`)}
                                    >
                                        ユーザ設定
                                    </button> */}
                                    <button
                                        className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                        onClick={() => handleNavigation(`../${uuid}/schedule/category`)}
                                    >
                                        カテゴリー設定
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold tracking-tight my-2 ml-2">{HEADER_NAME}</h1>
                )
                }
            </header >
        ) : (
            <button
                className="fixed right-2.5 bg-black bg-opacity-50 text-white w-10 h-8 flex items-center justify-center shadow-lg transition-opacity"
                onClick={handleHeadarDisplay}
                aria-label="Toggle header visibility"
            >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {/*下向きの2重矢印（矢印間に少しスペースを追加） */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5" />
                    <path className="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 14l5 5 5-5" />
                </svg>
            </button>
        )
    );
});
