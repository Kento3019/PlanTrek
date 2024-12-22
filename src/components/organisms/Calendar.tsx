import React, { forwardRef, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventClickArg } from '@fullcalendar/core';
import { useCategories } from '../provider/CategoryProvider';
import DoubleLeftArrow from '../image/DoubleLeftArrow';
import DoubleRightArrow from '../image/DoubleRightArrow';

interface CalendarProps {
    events: Array<{
        id: string;
        title: string;
        start: string;
        end: string;
        description: string;
        category: string;
    }>;
    initialDate: Date;
    datesSet: (dateInfo: { start: Date; end: Date }) => void;
    onEventClick: ((arg: EventClickArg) => void) | undefined;
}

// Calendar コンポーネントを forwardRef でラップ
const Calendar = forwardRef<any, CalendarProps>(({ events, onEventClick, initialDate, datesSet }, ref) => {
    const calendarRef = useRef<any>(null);

    // イベントの表示内容をカスタマイズ
    const { categories } = useCategories();

    const renderEventContent = (eventInfo: any) => {
        const { title, extendedProps } = eventInfo.event;
        const { category } = extendedProps;

        const categoryColors: { [key: string]: string } =
            categories
                .sort((a, b) => a.cid > b.cid ? 1 : -1)
                .reduce((acc, category) => {
                    acc[category.cid] = category.categoryColor.bg; // `categoryColor` 配列の最初の要素を使用
                    return acc;
                }, {} as { [key: string]: string });

        return (
            <div className={`-my-0.5 text-white text-[8.0px] sm:text-[10px] ${categoryColors[category] || 'bg-gray-500'} w-full`}>
                <div className="truncate">{title}</div>
            </div>
        );
    };

    const renderDayCell = (e: any) => {
        const { dayNumberText } = e;
        return <>{dayNumberText.replace('日', '')}</>;
    };

    const handlePrevMonth = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().prev(); // 前月に移動
        }
    };

    const handleNextMonth = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().next(); // 次月に移動
        }
    };

    return (
        <div className="relative">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale="ja"
                events={events}
                eventContent={renderEventContent}
                eventClick={onEventClick}
                initialDate={initialDate}
                datesSet={(dateInfo) => datesSet({ start: dateInfo.start, end: dateInfo.end })}
                headerToolbar={{
                    left: 'title', // 左側に「前月」「次月」「今日」を配置
                    center: '', // タイトルは中央
                    right: '', // 右側には何も表示しない
                }}
                dayCellContent={renderDayCell}
                aspectRatio={1.4}
            />

            {/* FABボタン：中央配置 */}
            <button
                onClick={handlePrevMonth}
                className="pl-1 z-10 absolute left-0 top-1/2  bg-black bg-opacity-20 hover:bg-opacity-60 text-white w-5 h-12 flex items-center justify-center shadow-lg focus:outline-none"
            >
                <DoubleLeftArrow />
            </button>

            <button
                onClick={handleNextMonth}
                className="pr-1 z-10 absolute right-0 top-1/2  bg-black bg-opacity-20 hover:bg-opacity-60 text-white w-5 h-12 flex items-center justify-center shadow-lg focus:outline-none"
            >
                <DoubleRightArrow />
            </button>
        </div>
    );
});

export default Calendar;
