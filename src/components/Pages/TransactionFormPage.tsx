import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { FormInput } from '../atoms/FormInput';
import { NegativeButton } from '../atoms/NegativeButton';
import { PositiveButton } from '../atoms/PositiveButton';
import { SelectBox } from '../atoms/SelextBox';
import { useTransactionFormDataState } from '../hooks/useTransactionFormDataState';
import { useTransactionsManager } from '../hooks/useTransactionsManager';
import { LabeledCheckBox } from '../molcules/LabeledCheckBox';
import { ConfimationModal } from '../organisms/ConfimationModal';
import { useTransactions } from '../provider/ExpenseTransactionProvider';
import { useGroup } from '../provider/GroupProvider';
import { NAME_AMOUNT, NAME_CONTENT, NAME_INVOLVES, NAME_PAYER } from '../types/FieldName';

const PLACEHOLDER_CONTENT = "イベント代";
const PLACEHOLDER_AMOUNT = '5000'

const BUTTON_REGISTER = "登録";
const BUTTON_CLOSE = "閉じる";
const BUTTON_DELETE = "削除";

export const TransactionFormPage = memo(() => {
    const { setSelectedTransaction, selectedTransaction } = useTransactions();
    const { formData, updateFormData, handleFormFieldChange, handleFieldRegister } = useTransactionFormDataState();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { group } = useGroup();
    const [isCheckBox, setIsCheckBox] = useState(false);
    const { deleteTransaction } = useTransactionsManager();

    useEffect(() => {
        updateFormData(selectedTransaction);
    }, [updateFormData, selectedTransaction]);

    useEffect(() => {
        setIsCheckBox(selectedTransaction ? selectedTransaction.involves.length !== group.length : false);
    }, [selectedTransaction, group]);

    const handleClick = () => {
        navigate(-1)
        setSelectedTransaction(undefined);
    }

    const renderInputs = () => (
        <>
            <div className="mt-4">
                <div className='flex flex-col'>
                    <div className='px-2 mb-1 flex flex-row items-baseline'>
                        <p className="w-20   text-gray-500">誰が</p>
                        <SelectBox
                            value={formData.payer ? formData.payer.uid || group[0].uid : ""}
                            name={NAME_PAYER}
                            onChange={handleFormFieldChange}
                            className="w-full mb-4"
                        >
                            {group.map((user) => (
                                <option key={user.uid} value={user.uid}>
                                    {user.userName}
                                </option>
                            ))}
                        </SelectBox>
                    </div>
                    <div className='px-2 mr-1 mb-3  flex flex-row items-center'>
                        <p className="w-20 text-gray-500 ">誰に</p>
                        {isCheckBox ? (
                            <div className="flex flex-wrap gap-4 px-2">
                                {group.map((user) => (
                                    <LabeledCheckBox
                                        type="checkbox"
                                        checked={formData.involves.some((involvedUser) => involvedUser.uid === user.uid)}
                                        name={NAME_INVOLVES}
                                        value={user.uid}
                                        onChange={handleFormFieldChange}
                                        label={user.userName}
                                        key={user.uid}
                                        className="accent-neutral-600"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="-mx-2 flex flex-row gap-2">
                                <LabeledCheckBox
                                    type="radio"
                                    checked={!isCheckBox}
                                    onChange={() => { }}
                                    label="グループ"
                                    className="accent-neutral-600"
                                />
                                <LabeledCheckBox
                                    type="radio"
                                    checked={isCheckBox}
                                    onChange={() => { setIsCheckBox(!isCheckBox) }}
                                    label="個別で選択"
                                    className="accent-neutral-600"
                                />
                            </div>
                        )}
                    </div>
                    <div className='px-2 py-2 flex flex-row items-baseline'>
                        <p className="w-20 text-gray-500">何を</p>
                        <FormInput
                            type="text"
                            placeholder={PLACEHOLDER_CONTENT}
                            name={NAME_CONTENT} // NAME_CONTENTを設定
                            value={formData.content}
                            onChange={handleFormFieldChange}
                            className="px-2 w-full mb-2"
                        />
                    </div>
                    <div className='px-2 py-2 flex flex-row items-baseline'>
                        <p className="w-20 text-gray-500">いくら</p>
                        <FormInput
                            type="number"
                            placeholder={PLACEHOLDER_AMOUNT}
                            name={NAME_AMOUNT}
                            value={formData.amount === 0 ? undefined : formData.amount}
                            onChange={handleFormFieldChange}
                            className="px-2 w-full mb-4 "
                            min="0"
                        />
                    </div>
                </div>
            </div>
        </>
    );

    const renderButtons = () => (
        <div className="flex flex-col space-y-3 mt-5">
            <PositiveButton
                onClick={() => handleFieldRegister(formData)}
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
            {selectedTransaction && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="py-2 px- text-red-500 hover:text-white border hover:bg-red-600 border-red-300 rounded-md shadow-md transition  font-semibold"
                >
                    {BUTTON_DELETE}
                </Button>
            )}
        </div >
    );
    return (
        <div className='mb-10'>
            {renderInputs()}
            {renderButtons()}
            {isOpen && (
                < ConfimationModal
                    label="削除します。よろしいですか？"
                    openButtonlabel='OK'
                    closeButtonlabel='Cancel'
                    isOpen={isOpen}
                    handleModalAction={() => { navigate(-1); deleteTransaction(formData) }}
                    onClose={() => { setIsOpen(false) }}
                />
            )}
        </div>

    );

});
