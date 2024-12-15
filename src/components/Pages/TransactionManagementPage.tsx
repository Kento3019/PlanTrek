import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PositiveButton } from '../atoms/PositiveButton';
import { RoundedButton } from '../atoms/RoundedButton';
import { useEqualSplitHandler } from '../hooks/useEquelSpilitHandler';
import { useFAB } from '../hooks/useFAB';
import { useFetchData } from '../hooks/useFetchData';
import { useTransactionsManager } from '../hooks/useTransactionsManager';
import { NoteIcon } from '../image/NoteIcon';
import { EquelSplitTable } from '../organisms/EqualSplitTable';
import { FAB } from '../organisms/FAB';
import { ListNotFound } from '../organisms/ListNotFound';
import { Loading } from '../organisms/Loadning';
import { TransactionTable } from '../organisms/TransactionTable';
import { useTransactions } from '../provider/ExpenseTransactionProvider';
import { useGroup } from '../provider/GroupProvider';
import { ExpenseTransaction } from '../types/ExpenseTransaction';
import { useUserProfileManager } from '../hooks/useUserProfileManager';

export const TransactionManagementPage = () => {

    const navigate = useNavigate();

    const { group } = useGroup();
    const { isOpenFAB, toggleFAB } = useFAB();
    const { readTransaction } = useTransactionsManager();
    const { readUsers } = useUserProfileManager();
    const { transactions, setSelectedTransaction } = useTransactions();
    const { liquidation, calculateLiquidation } = useEqualSplitHandler();
    const [loading, setLoading] = useState(true);
    const { fetchData } = useFetchData();

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            await fetchData([readTransaction(), readUsers()]);
            setLoading(false);
        };
        fetchDataAsync();
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        calculateLiquidation(group, transactions);
    }, [group, transactions, calculateLiquidation]);

    const handleClick = () => {
        navigate(`./overview`)
    }

    const navigateToForm = (transaction: ExpenseTransaction | undefined) => {
        if (transaction) {
            setSelectedTransaction(transaction);
        }
        navigate(`./form`);
    };
    return (
        <>
            <Loading loading={loading}>
                <ListNotFound
                    existing={transactions.length === 0}
                    onClick={() => navigateToForm(undefined)}
                    btnStr='立替記録を追加する'
                    msgStr='「立替記録を追加する」からメンバー間の立替記録を登録しましょう'
                >
                    <div className='pb-6'>
                        <div className='hidden sm:flex justify-start mt-2'>
                            <PositiveButton
                                className='px-2 rounded-md'
                                onClick={() => navigateToForm(undefined)}
                            >
                                立替記録を追加する
                            </PositiveButton>
                        </div>
                        <div className='py-4'>
                            <TransactionTable navigate={navigateToForm} />
                            <EquelSplitTable liquidation={liquidation} />
                            <PositiveButton className="w-full rounded-md " onClick={handleClick}>明細を見る</PositiveButton>
                        </div>
                        <FAB isOpenFAB={isOpenFAB} onClose={toggleFAB}>
                            <div className="flex flex-col">
                                <RoundedButton
                                    className="px-4 py-3 bg-indigo-600 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-400 transition-all duration-200 ease-in-out"
                                    onClick={() => navigateToForm(undefined)}
                                >
                                    <p className="flex flex-row">
                                        <span className="mr-2"><NoteIcon /></span>
                                        立替記録を追加する
                                    </p>
                                </RoundedButton>
                            </div>
                        </FAB>
                    </div>
                </ListNotFound>
            </Loading>
        </>

    );
}
