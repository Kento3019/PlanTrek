export const useFetchData = () => {

    const fetchData = async (readFunctions: any[]) => {
        try {
            await Promise.all([
                ...readFunctions
            ]);
        } catch (error) {
            console.error('データの読み込み中にエラーが発生しました:', error);
        }
    };
    return { fetchData };
}
