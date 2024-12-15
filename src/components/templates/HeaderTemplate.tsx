import React, { useState, memo } from 'react';
import { CrossIcon } from '../image/CrossIcon';
import { useNavigate, useParams } from 'react-router-dom';

const HEADER_NAME = "PlanTrek"

export const HeaderTemplate = memo(() => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { uuid } = useParams();
    const navigate = useNavigate();

    return (
        <header className="bg-gradient-to-r  from-indigo-600 via-purple-500 to-teal-400 text-white px-4 shadow-lg">
            {uuid && (window.location.pathname === `/${uuid}/schedule` || window.location.pathname === `/${uuid}/transaction`) ? (
                <>
                    <div className="sm:hidden flex flex-row items-center">
                        <button
                            type="button"
                            className="inline-flex items-center w-12 h-12 justify-center text-sm text-gray-200 rounded-lg"
                            aria-controls="navbar-default"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <h1 className="text-3xl font-bold tracking-tight">{HEADER_NAME}</h1>
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
                                    <li>
                                        {window.location.pathname === `/${uuid}/schedule` ? (
                                            <button
                                                className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                                onClick={() => { navigate(`../${uuid}/transaction`); setMenuOpen(false); }}
                                            >
                                                立替記録追加
                                            </button>
                                        ) : (
                                            <button
                                                className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                                onClick={() => { navigate(`../${uuid}/schedule`); setMenuOpen(false); }}
                                            >
                                                予定追加
                                            </button>
                                        )}
                                    </li>
                                    <li>
                                        <button
                                            className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                            onClick={() => { navigate(`../${uuid}/user`); setMenuOpen(false); }}
                                        >
                                            ユーザ更新
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block w-full font-semibold text-left text-lg text-white hover:border hover:border-white transition-all p-2"
                                            onClick={() => { navigate(`../${uuid}/schedule/category`); setMenuOpen(false); }}
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
                                {window.location.pathname === `/${uuid}/schedule` ? (
                                    <button
                                        className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                        onClick={() => navigate(`../${uuid}/transaction`)}
                                    >
                                        立替記録追加
                                    </button>
                                ) : (
                                    <button
                                        className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                        onClick={() => navigate(`../${uuid}/schedule`)}
                                    >
                                        予定追加
                                    </button>
                                )}
                                < button
                                    className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                    onClick={() => navigate(`../${uuid}/user`)}
                                >
                                    ユーザ設定
                                </button>
                                <button
                                    className="text-sm font-semibold text-white hover:border-b hover:border-white transition-all"
                                    onClick={() => navigate(`../${uuid}/schedule/category`)}
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
    );
});
