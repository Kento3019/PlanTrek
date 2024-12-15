import { useNavigate } from 'react-router-dom';

interface UseEventHandlersProps<T> {
    items: T[];
    setSelectedItem: (item: T | undefined) => void;
    itemKey: keyof T;
    basePath: string;
}

interface EventArg {
    id: string;
}

export const useEventHandlers = <T>({ items, setSelectedItem, itemKey, basePath }: UseEventHandlersProps<T>) => {
    const navigate = useNavigate();

    const navigateToDetail = async (item?: T) => {
        setSelectedItem(item);
        navigate(`${basePath}/form`);
    };

    const handleItemClick = (arg: EventArg) => {
        const selectedItem = items.find((item) => item[itemKey] === arg.id);
        if (selectedItem) {
            navigateToDetail(selectedItem);
        }
    };

    return { handleItemClick, navigateToDetail };
};
