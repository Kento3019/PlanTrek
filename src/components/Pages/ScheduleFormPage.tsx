import { memo, useEffect, useState } from 'react';
import { useSchedules } from '../provider/SchedulesProvider';
import { PositiveButton } from '../atoms/PositiveButton';
import { NegativeButton } from '../atoms/NegativeButton';
import { FormInput } from '../atoms/FormInput';
import { Accordion, AccordionItem } from '../organisms/Accodion';
import { NAME_CONTENT, NAME_STARTDATE, NAME_ENDDATE, NAME_STARTTIME, NAME_ENDTIME, NAME_CONTENTURL, NAME_REMARKS, NAME_ALLDAY } from '../types/FieldName';
import { useNavigate } from 'react-router-dom';
import TagIcon from '../image/TagIcon';
import MenuDeepIcon from '../image/MenuDeepIcon';
import MapPinIcon from '../image/mapPinIcon';
import { useCategories } from '../provider/CategoryProvider';
import { Button } from '../atoms/Button';
import { useScheduleManager } from '../hooks/useScheduleManager';
import { ConfimationModal } from '../organisms/ConfimationModal';
import { useScheduleFormDataState } from '../hooks/useScheduleFormDataState';
import { FormSelect } from '../organisms/FormSelect';
import Switch from '../molcules/Switch';

const PLACEHOLDER_CONTENT = "タイトル";
const PLACEHOLDER_CONTENTURL = "場所  https://example.co.jp";
const PLACEHOLDER_REMARKS = "説明";

const BUTTON_REGISTER = "登録";
const BUTTON_CLOSE = "閉じる";
const BUTTON_DELETE = "削除";

export const ScheduleFormPage = memo(() => {
    const { setSelectedSchedule, selectedSchedule } = useSchedules();
    const { formData, updateFormData, handleFormFieldChange, handleFieldRegister, handleOptionChange } = useScheduleFormDataState();
    const navigate = useNavigate();
    const { categories } = useCategories();
    const { deleteSchedule } = useScheduleManager();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        updateFormData(selectedSchedule);
    }, [updateFormData, selectedSchedule]);

    const handleClick = () => {
        navigate(-1)
        setSelectedSchedule(undefined);
    }
    const renderInputs = () => (
        <>
            <div className='space-y-4 mt-1'>
                <FormInput
                    type="text"
                    placeholder={PLACEHOLDER_CONTENT}
                    name={NAME_CONTENT} // NAME_CONTENTを設定
                    value={formData.content}
                    onChange={handleFormFieldChange}
                    className="p-3 w-full"
                />
                <div className="flex flex-row items-center pr-2">
                    <p className="flex-grow text-left">終日</p>
                    <Switch
                        checked={formData.allDay}
                        onChange={handleFormFieldChange}
                        name={NAME_ALLDAY}
                    />
                </div>
                <div className="flex flex-col gap-2 pr-2">
                    <div className="flex flex-row items-center gap-2">
                        {/* ラベル「開始」を横いっぱいに広げる */}
                        <p className="flex-grow text-left">開始</p>
                        {/* 入力フィールド */}
                        <div className="flex flex-row gap-4">
                            {/* 日付 */}
                            <div className="">
                                <FormInput
                                    type="date"
                                    value={formData.date.start}
                                    onChange={handleFormFieldChange}
                                    name={NAME_STARTDATE}
                                    className="mb-2 p-2 w-full"
                                />
                            </div>

                            {/* 時間（開始） */}
                            {!formData.allDay && (
                                <div className="">
                                    <FormInput
                                        type="time"
                                        value={formData.time.start}
                                        onChange={handleFormFieldChange}
                                        name={NAME_STARTTIME}
                                        className="mb-2 p-2 w-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        {/* ラベル「開始」を横いっぱいに広げる */}
                        <p className="flex-grow text-left">終了</p>

                        {/* 入力フィールド */}
                        <div className="flex flex-row gap-4">
                            {/* 日付 */}
                            <div className="">
                                <FormInput
                                    type="date"
                                    value={formData.date.end}
                                    onChange={handleFormFieldChange}
                                    name={NAME_ENDDATE}
                                    className="mb-2 p-2 w-full"
                                />
                            </div>

                            {/* 時間（開始） */}
                            {!formData.allDay && (
                                <div className="">
                                    <FormInput
                                        type="time"
                                        value={formData.time.end}
                                        onChange={handleFormFieldChange}
                                        name={NAME_ENDTIME}
                                        className="mb-2 p-2 w-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Accordion>
                    <AccordionItem title="スケジュール情報" isOpen={true}>
                        <div className='flex flex-row items-center gap-2 ml-2'>
                            <MenuDeepIcon />
                            <FormInput
                                type="text"
                                placeholder={PLACEHOLDER_REMARKS}
                                name={NAME_REMARKS}
                                value={formData.remarks}
                                onChange={handleFormFieldChange}
                                className=" w-full p-3"
                            />
                        </div>
                        <div className='flex flex-row items-center gap-2 ml-2 mb-2'>
                            <MapPinIcon />
                            <FormInput
                                type="text"
                                placeholder={PLACEHOLDER_CONTENTURL}
                                name={NAME_CONTENTURL}
                                value={formData.contentURL}
                                onChange={handleFormFieldChange}
                                className="p-3 w-full"
                            />
                        </div>
                        <div className='flex flex-row items-center  gap-2 ml-2'>
                            <TagIcon />
                            <div className="w-full">
                                <FormSelect
                                    categories={categories}
                                    onChange={(option) => handleOptionChange(option)}
                                    value={
                                        formData.category ?
                                            {
                                                value: formData.category.cid,
                                                label: (
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`inline-block w-3 h-3 rounded-full ${formData.category.categoryColor.bg}`}
                                                        ></span>
                                                        {categories ? categories.find(category => category.cid === formData.category.cid)?.categoryName : ""}
                                                    </div>
                                                ),
                                            } : null}
                                />
                            </div>
                        </div>
                    </AccordionItem>
                </Accordion>
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
            {selectedSchedule && (
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
        <div className='mb-10 max-h-screen'>
            {renderInputs()}
            {renderButtons()}
            {isOpen && (
                < ConfimationModal
                    label="削除します。よろしいですか？"
                    openButtonlabel='OK'
                    closeButtonlabel='Cancel'
                    isOpen={isOpen}
                    handleModalAction={() => { navigate(-1); deleteSchedule(formData) }}
                    onClose={() => { setIsOpen(false) }}
                />
            )}
        </div>

    );

});
