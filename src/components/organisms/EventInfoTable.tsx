import React, { useEffect, useState } from 'react';
import { Column, Table } from '../molcules/Table';
import { useSchedules } from '../provider/SchedulesProvider';
import { Schedule } from '../types/Schedule';
import CircleIcon from '../image/CircleIcon';

type ScheduleColumn = {
    schedule: React.JSX.Element;
    event: React.JSX.Element;
};

const tableColumns: Column<ScheduleColumn>[] = [
    { header: '', accessor: 'schedule' },
    { header: '', accessor: 'event' },
];

type Props = {
    onOpen: () => void;
};

export const EventInfoTable: React.FC<Props> = ({ onOpen }: Props) => {
    const { schedules } = useSchedules();
    const [sortedSchedules, setSortedSchedules] = useState<Schedule[]>([]);  // 並び替えたトランザクションを保存
    const { setSelectedSchedule } = useSchedules();

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

    return (
        <>
            <Table
                columns={tableColumns}
                data={sortedSchedules.map(schedule => ({
                    schedule: (
                        <div
                            className="text-left cursor-pointer"
                            onClick={() => { setSelectedSchedule(schedule); onOpen() }}
                        >
                            <div className="flex flex-row max-w-md">
                                {schedule.date.start !== schedule.date.end ? (
                                    <>
                                        <p>
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
                            <div className="flex flex-row flex-wrap items-center">
                                <div className="flex flex-row mr-1.5">
                                    <CircleIcon className={`${schedule.category.categoryColor.text}`} />
                                </div>
                                <div>
                                    {schedule.contentURL !== "" ? (
                                        <span className="text-blue-800 underline">
                                            {schedule.content || "no title"}
                                        </span>
                                    ) : (
                                        <span>{schedule.content || "no title"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ),
                    event: (
                        <div className="text-right space-y-1 max-w-md">
                            <p className="text-xs leading-tight text-gray-400 max-w-sm"></p>
                        </div>
                    ),
                }))}
            />
        </>
    )
}
