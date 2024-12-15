import React from 'react';
import { Column, Table } from '../molcules/Table';

type Liquidation = {
    debtor: { userName: string };
    creditor: { userName: string };
    payment: number;
};

type EquelSpilitTableProps = {
    liquidation: Liquidation[];
};

export const EquelSplitTable = ({ liquidation }: EquelSpilitTableProps) => {
    const tableColumns: Column<{
        creditor: React.JSX.Element;
        payment: React.JSX.Element;
    }>[] = [
            { header: '支払者', accessor: 'creditor' },
            { header: '金額', accessor: 'payment' },
        ];

    return (
        <>
            <p className='p-2'>清算方法</p>
            <Table
                columns={tableColumns}
                data={liquidation.map((ld) => ({
                    creditor: (
                        <div className='text-left'>
                            <p>{`${ld.debtor.userName} → ${ld.creditor.userName}`}</p>
                        </div>
                    ),
                    payment: (
                        <div className='text-right'>
                            <span>￥{Number(ld.payment).toLocaleString('ja-JP')}</span>
                        </div>
                    ),
                }))}
            />
        </>
    );
};
