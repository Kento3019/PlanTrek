import React from 'react';

export type Column<T> = {
    header: string;
    accessor: keyof T;
};

export type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export const Table = <T,>({ columns, data }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto pb-4">
            <div className="min-w-full">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead></thead>
                        <tbody >
                            {data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b hover:bg-purple-50 transition duration-200"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            className="whitespace-nowrap px-2 py-2 text-center"
                                            key={colIndex}
                                        >
                                            {row[column.accessor] as React.ReactNode}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
