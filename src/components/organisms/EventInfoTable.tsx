import React, { useEffect, useState } from 'react';
import { EditPenIcon } from '../image/EditPenIcon';
import { Column, Table } from '../molcules/Table';
import { useSchedules } from '../provider/SchedulesProvider';
import { Schedule } from '../types/Schedule';
import { ConfimationModal } from './ConfimationModal';
import CircleIcon from '../image/CircleIcon';

type ScheduleColumn = {
    schedule: React.JSX.Element;
    event: React.JSX.Element;
    item: React.JSX.Element;
};

const tableColumns: Column<ScheduleColumn>[] = [
    { header: '内容', accessor: 'schedule' },
    { header: '金額', accessor: 'event' },
    { header: '削除', accessor: 'item' },
];

type Props = {
    navigate: (Schedule: Schedule) => void;
};

export const EventInfoTable: React.FC<Props> = ({ navigate }) => {
    const { schedules } = useSchedules();
    const [sortedSchedules, setSortedSchedules] = useState<Schedule[]>([]);  // 並び替えたトランザクションを保存

    useEffect(() => {
        const sorted = [...schedules].sort((a, b) => {
            // 日付の開始時刻を比較 (昇順)
            const dateA = new Date(a.date.start);
            const dateB = new Date(b.date.start);
            if (dateA.getTime() !== dateB.getTime()) {
                return dateA.getTime() - dateB.getTime();
            }

            // 日付が同じ場合は開始時間を比較
            const timeA = new Date(`1970-01-01T${a.time.start}:00Z`);
            const timeB = new Date(`1970-01-01T${b.time.start}:00Z`);
            return timeA.getTime() - timeB.getTime();
        });

        setSortedSchedules(sorted);  // 並び替えたデータをセット
    }, [schedules]);



    const [isOpen, setIsOpen] = useState(false);
    const [selectedURL, setSelectedURL] = useState<string>('');

    const handleLinkClick = (url: string) => {
        setSelectedURL(url);  // 選択されたURLを保存
        setIsOpen(true);  // モーダルを開く
    };

    const handleModalAction = () => {
        // OKボタンがクリックされた場合に新規タブで遷移
        if (selectedURL) {
            window.open(selectedURL, '_blank');
        }
        setIsOpen(false);  // モーダルを閉じる
    };

    return (
        <>
            <Table
                columns={tableColumns}
                data={sortedSchedules.map(schedule => ({
                    schedule: (
                        <div className='text-left'>
                            <div className="flex flex-row max-w-md">
                                {schedule.date.start !== schedule.date.end ? (
                                    <>
                                        <p className="">
                                            {`${new Date(schedule.date.start).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}～${new Date(schedule.date.end).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}`}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>{new Date(schedule.date.start).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}</p>

                                        <div className="ml-1 leading-[1.4rem] text-gray-400 max-w-sm">
                                            {!schedule.allDay ? (
                                                <p>{`(${schedule.time.start}～${schedule.time.end})`}</p>
                                            ) : (
                                                <p>終日</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='flex flex-row flex-wrap'>
                                <div className="mt-1 flex flex-row mr-1.5">
                                    <CircleIcon className={`${schedule.category.categoryColor.text}`} />
                                </div>
                                <div className=''>
                                    {schedule.contentURL !== "" ? (
                                        <button
                                            className='text-blue-800 underline cursor-pointer'
                                            onClick={() => handleLinkClick(schedule.contentURL)}
                                        >
                                            <div className='items-center flex flex-row'>
                                                <p>{`${schedules.find(event => event.sid === schedule.sid)?.content || "no title"}`}</p>
                                            </div>
                                        </button>
                                    ) : (
                                        <p>{`${schedules.find(event => event.sid === schedule.sid)?.content || "no title"}`}</p>
                                    )
                                    }
                                </div>
                            </div>
                        </div >
                    ),
                    event: (
                        <div className="text-right space-y-1 max-w-md">
                            <p className="text-xs leading-tight text-gray-400 max-w-sm"></p>
                        </div>
                    ),
                    item: (
                        <div>
                            <button className='mr-4' onClick={() => navigate(schedule)}><EditPenIcon /></button>
                        </div>
                    ),
                }))}
            />
            {
                isOpen && (
                    < ConfimationModal
                        label="外部リンクに移動します"
                        openButtonlabel='OK'
                        closeButtonlabel='Cancel'
                        isOpen={isOpen}
                        handleModalAction={handleModalAction}
                        onClose={() => { setIsOpen(false) }}
                    />
                )
            }
        </>
    );
}
