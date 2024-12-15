import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEqualSplitHandler } from '../hooks/useEquelSpilitHandler';
import { Column, Table } from '../molcules/Table';
import { useGroup } from "../provider/GroupProvider";
import { NegativeButton } from '../atoms/NegativeButton';
import { useTransactions } from '../provider/ExpenseTransactionProvider';

export const LedgerOverviewPage = () => {
    const { group } = useGroup();
    const { transactions } = useTransactions();
    const { userBalances, calculateUserBalance

    } = useEqualSplitHandler();

    const navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        calculateUserBalance(group, transactions);
    }, [group, transactions, calculateUserBalance]);


    const tableColumns: Column<{
        creditor: React.JSX.Element;
        payment: React.JSX.Element;
    }>[] = [
            { header: '支払者', accessor: 'creditor' },
            { header: '金額', accessor: 'payment' },
        ];

    return (
        <div className='py-4'>
            <p className=''>貸し借り</p>
            <Table
                columns={tableColumns}
                data={userBalances.map((userBalance) => ({
                    creditor: (
                        <div className='text-left'>
                            <p className="">
                                {userBalance.user.userName}
                            </p>
                        </div>
                    ),
                    payment: (
                        <div className='text-right'>
                            <span >￥{Number(userBalance.balance).toLocaleString('ja-JP')}</span>
                        </div>
                    )
                }))}
            />
            <div className="my-4 w-full flex">
                <NegativeButton className="w-full" onClick={navigateBack}>Back</NegativeButton>
            </div>
        </div >
    );
};
