import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Category } from '../types/Category';

type CategoriesContextType = {
    categories: Array<Category>;
    setCategories: React.Dispatch<React.SetStateAction<Array<Category>>>;
}

type Props = {
    children: ReactNode;
}

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// カスタムフック名を useCategories に変更
export const useCategories = (): CategoriesContextType => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
};

export const CategoriesProvider = ({ children }: Props) => {
    const [categories, setCategories] = useState<Array<Category>>([]);

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};


export const initCategories: Category[] = [
    {
        cid: "1",
        categoryName: "オレンジの分類",
        categoryColor: { text: "text-orange-400", bg: "bg-orange-600", border: "border-orange-800" }
    },
    {
        cid: "2",
        categoryName: "赤の分類",
        categoryColor: { text: "text-red-600", bg: "bg-red-700", border: "border-red-800" }

    },
    {
        cid: "3",
        categoryName: "青の分類",
        categoryColor: { text: "text-blue-600", bg: "bg-blue-700", border: "border-blue-800" }

    },
    {
        cid: "4",
        categoryName: "緑の分類",
        categoryColor: { text: "text-green-600", bg: "bg-green-700", border: "border-green-800" }

    },
    {
        cid: "5",
        categoryName: "紫の分類",
        categoryColor: { text: "text-purple-600", bg: "bg-purple-700", border: "border-purple-800" }

    }
]
