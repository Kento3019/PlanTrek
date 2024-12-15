import React from 'react';

type Props = {
	className?: string; // オプショナルに変更
	size?: number; // サイズを可変にするためのプロパティ
};

export const CrossIcon = ({ className = "", size = 24 }: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			className={className}
			width={size} // 可変サイズ対応
			height={size} // 可変サイズ対応
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1}
				d="M8 8 L16 16 M16 8 L8 16"
			/>
		</svg>
	);
};
