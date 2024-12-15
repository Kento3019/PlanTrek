import React from "react";
import { PositiveButton } from "../atoms/PositiveButton";
import { useNavigate } from "react-router-dom";
import HomeImage1 from "../image/HomeImage1.png"; // 画像をインポート
import HomeImage2 from "../image/HomeImage2.png";
import HomeImage3 from "../image/HomeImage3.png";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`../new`);

    };

    return (
        <div>
            {/* ヒーローセクション */}
            <section className="text-center py-20">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-800">
                    軽やかに、つながる
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    あなたの日常をスマートに。<br className="sm:hidden" />
                    スケジュール共有の新しい形。
                </p>
                <PositiveButton onClick={handleClick} className="mt-6 px-8 py-3 bg-indigo-600 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-400 rounded-full transition-all">
                    はじめる
                </PositiveButton>
            </section>

            {/* 特徴セクション */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    {[
                        {
                            title: "シンプルな操作",
                            description: "直感的なUIで誰でも簡単に使えます",
                            imgSrc: HomeImage2,
                            imgAlt: "シンプルな操作の画像",
                            reverse: false,
                        },
                        {
                            title: "リアルタイム共有",
                            description: "スケジュールを瞬時にチームと共有",
                            imgSrc: HomeImage1,
                            imgAlt: "リアルタイム共有の画像",
                            reverse: true,
                        },
                        {
                            title: "自由なカスタマイズ",
                            description: "あなたに合わせた柔軟な設定",
                            imgSrc: HomeImage3,
                            imgAlt: "自由なカスタマイズの画像",
                            reverse: false,
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className={`flex items-center mt-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all ${feature.reverse ? "sm:flex-row-reverse" : "sm:flex-row"} flex-col sm:flex-row`}
                        >

                            <div className="flex-1 ">
                                <h3 className="text-xl font-semibold text-gray-700 text-center sm:text-left">{feature.title}</h3>
                                <p className="my-2 sm:mt-4 text-gray-600">{feature.description}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <img
                                    src={feature.imgSrc}
                                    alt={feature.imgAlt}
                                    className="w-[200px] h-[350px] object-cover rounded-lg shadow-md sm:mr-5"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
