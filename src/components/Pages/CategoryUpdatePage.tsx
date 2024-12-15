import { memo } from 'react';
import { FormInput } from '../atoms/FormInput';
import TagIcon from '../image/TagIcon';
import { useCategories } from '../provider/CategoryProvider';
import { PositiveButton } from '../atoms/PositiveButton';
import { NegativeButton } from '../atoms/NegativeButton';
import { useNavigate } from 'react-router-dom';
import { useCategoriesManager } from '../hooks/useCategoriesManage';


const BUTTON_REGISTER = "登録";
const BUTTON_CLOSE = "閉じる";

export const CategoryUpdatePage = memo(() => {

    const { categories, setCategories } = useCategories();
    const navigate = useNavigate();
    const { updateCategories } = useCategoriesManager();


    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // カテゴリを一度だけ検索
        const updatedCategories = categories.map(cat =>
            cat.cid === name
                ? {
                    ...cat,
                    categoryName: value, // 変更された値を設定
                }
                : cat // 変更がない場合はそのまま
        );
        setCategories(updatedCategories);
    };

    const handleCategoryRegister = () => {
        if (categories.every(cat => cat.categoryName.length > 0)) {
            updateCategories(categories);
            navigate(-1);
        } else {
            alert("1文字以上を設定してください")
        }
    }

    const handleClick = () => {
        navigate(-1)
    }

    const renderButtons = () => (
        <div className="flex flex-col space-y-3 mt-5">
            <PositiveButton
                onClick={() => handleCategoryRegister()}
                className="py-2 px-6 rounded-md "
            >
                {BUTTON_REGISTER}
            </PositiveButton>
            <NegativeButton
                onClick={() => handleClick()}
                className="py-2 px-6"
            >
                {BUTTON_CLOSE}
            </NegativeButton>
        </div>
    );

    return (
        <div className='mb-10'>
            {categories.map((category) => (
                <div className='flex flex-row items-center'>
                    <TagIcon className={category.categoryColor.text} />
                    <FormInput
                        type="text"
                        name={category.cid}
                        value={category.categoryName}
                        onChange={handleCategoryChange}
                        className=" w-full p-3"
                    />
                </div>
            ))}
            {renderButtons()}
        </div>

    );


});
