import React from 'react';
import { Pill } from '../molcules/Pill';
import { EditPenIcon } from '../image/EditPenIcon';
import { Column, Table } from '../molcules/Table';
import { useTransactions } from '../provider/ExpenseTransactionProvider';
import { ExpenseTransaction } from '../types/ExpenseTransaction';

type TransactionColumn = {
    content: React.JSX.Element;
    item: React.JSX.Element;
    tid: string;
    amount: React.JSX.Element;
}

const tableColumns: Column<TransactionColumn>[] = [
    { header: '内容', accessor: 'content' },
    { header: '金額', accessor: 'amount' },
    { header: '削除', accessor: 'item' },
];

type Props = {
    navigate: (transaction: ExpenseTransaction) => void;
};

export const TransactionTable = ({ navigate }: Props) => {
    const { transactions } = useTransactions();

    return (
        <>
            <Table
                columns={tableColumns}
                data={
                    transactions
                        .sort((a, b) => a.date > b.date ? 1 : -1)
                        .filter(transaction => transaction.amount !== 0)
                        .map(transaction => ({
                            ...transaction,
                            content: (
                                <div className="text-left space-y-1 max-w-md">
                                    <p>{transaction.content}</p>
                                    <div className='text-xs text-gray-400'>
                                        <p className=" leading-tight  max-w-sm">
                                            {`${transaction.payer.userName}が立替え (${new Date(transaction.date).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })})`}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {transaction.involves.map((user, index) => (
                                                <Pill
                                                    key={user.userName}
                                                    className={` leading-tight bg-white ${index > 0 ? '-ml-2' : ''}`}
                                                    label={user.userName.slice(0, 1)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ),
                            amount: (
                                <div className='text-right'>
                                    <span >￥{Number(transaction.amount).toLocaleString('ja-JP')}</span>
                                </div>
                            ),
                            item: (
                                <div>
                                    <button className='mr-4' onClick={() => navigate(transaction)}><EditPenIcon /></button>
                                </div>
                            ),
                        }))}
            />
        </>
    );
}
