import React from "react";
import { Category } from "../types/Category";
import Select, { ActionMeta, PropsValue, SingleValue } from "react-select";

type Props = {
    categories: Category[];
    value: PropsValue<{
        value: string;
        label: React.JSX.Element;
    }>
    onChange: (newValue: SingleValue<{
        value: string;
        label: React.JSX.Element;
    }>, actionMeta: ActionMeta<{
        value: string;
        label: React.JSX.Element;
    }>) => void
};

export const FormSelect = ({ categories, value, onChange }: Props) => {
    const options = categories.map((category) => ({
        value: category.cid,
        label: (
            <div className="flex items-center gap-2">
                <span
                    className={`inline-block w-3 h-3 rounded-full ${category.categoryColor.bg}`}
                ></span>
                {category.categoryName}
            </div>
        ),
    }));
    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected || state.isFocused
                ? "#f0f0f0" // 選択中またはホバー中の背景色を薄いグレー
                : "white",
            color: "#333", // 文字色を濃いグレー
            padding: 10,
            cursor: "pointer", // ホバー時の視覚的フィードバック
            width: "100%", // コンテナを横幅いっぱいに
        }),
        control: (provided: any) => ({
            ...provided,
            backgroundColor: "#f5f5f6",
            border: "none", // 枠線を消す
            borderBottom: "1px solid #ddd", // 下線を薄いグレーに設定
            borderRadius: 0, // 角丸をなくす
            boxShadow: "none", // フォーカス時の影を消す
            width: "100%", // コントロール自体を横幅いっぱいに
            "&:hover": {
                borderBottom: "1px solid #bbb", // ホバー時に少し濃いグレーに
            },
            padding: "5px 0", // 下線を際立たせるために上下のパディングを調整
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: "#888", // ドロップダウンアイコンの色
            "&:hover": { color: "#555" }, // ホバー時のアイコンの色
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "#aaa", // プレースホルダーの色
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#333", // 選択済みの値の文字色
        }),
    };


    return (
        <>
            <div className="w-full">
                <Select
                    options={options}
                    styles={customStyles}
                    value={value}
                    onChange={onChange}
                    isSearchable={false}
                />
            </div>
        </>
    );
};
