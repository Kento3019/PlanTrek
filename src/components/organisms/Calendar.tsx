import React, { forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventClickArg } from '@fullcalendar/core';
import { useCategories } from '../provider/CategoryProvider';

interface CalendarProps {
    events: Array<{
        id: string;
        title: string;
        start: string;
        end: string;
        description: string;
        category: string;
    }>;
    onEventClick: ((arg: EventClickArg) => void) | undefined;
}

// Calendar コンポーネントを forwardRef でラップ
const Calendar = forwardRef<any, CalendarProps>(({ events, onEventClick }, ref) => {
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
    return (
        <div className="">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale="ja"
                events={events}
                eventContent={renderEventContent}
                eventClick={onEventClick}
                headerToolbar={{
                    left: 'title', // 左側に「前月」「次月」「今日」を配置
                    center: 'prev,next', // タイトルは中央
                    right: '', // 右側には何も表示しない
                }}
                dayCellContent={renderDayCell}
                aspectRatio={1.4}
            />
        </div>

    );
});

export default Calendar;
