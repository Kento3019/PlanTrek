import { useCallback, useState } from "react";
import { User } from "../types/User";
import { ExpenseTransaction } from "../types/ExpenseTransaction";

export const useEqualSplitHandler = () => {

    type liquidationType = {
        creditor: User;
        debtor: User;
        payment: number;
    }
    type userBalanceType = {
        user: User;
        balance: number;
    }

    const [liquidation, setLiquidation] = useState<liquidationType[]>([]);
    const [userBalances, setUserBalances] = useState<userBalanceType[]>([]);

    // ユーザーの収支を計算
    const processUserBalances = (group: User[], transactions: ExpenseTransaction[]) => {
        return group.map((user) => {
            let balance = 0;

            // 各取引での収支を計算
            transactions.forEach((transaction) => {
                if (user.uid === transaction.payer.uid) {
                    balance += Number(transaction.amount);
                }
                if (transaction.involves.some(involvedUser => involvedUser.uid === user.uid)) {
                    const amount = Number(transaction.amount ?? 0);
                    const involvesLength = transaction.involves.length || 1;
                    balance -= Number((amount / involvesLength).toFixed(2));
                }

            });
            balance = Math.round(balance);
            return { user, balance };
        });
    }

    const processLiquidation = useCallback((
        userBalances: { user: User; balance: number }[],
        liquidationSteps: liquidationType[]
    ): liquidationType[] => { // 戻り値の型を明示的に指定
        if (userBalances.length === 0) {
            return liquidationSteps; // 全てのユーザーの収支が処理されたら終了
        }

        // 収支を降順でソート
        const sortedBalances = [...userBalances].sort((a, b) => b.balance - a.balance);

        const creditor = sortedBalances[0] ?? null;
        const debtor = sortedBalances[sortedBalances.length - 1] ?? null;

        // Creditor（債権者）と Debtor（債務者）が存在するかチェック
        if (!creditor || !debtor || creditor.balance <= 0 || debtor.balance >= 0) {
            return liquidationSteps; // いずれかの収支が不適切な場合、終了
        }

        const payment = Math.min(creditor.balance, Math.abs(debtor.balance));

        // 支払額が0の場合は終了
        if (payment <= 0) {
            return liquidationSteps;
        }

        // 収支を更新
        creditor.balance -= payment;
        debtor.balance += payment;

        // 収支が残っているユーザーだけをフィルタリング
        const updatedBalances = sortedBalances.filter(balance => balance.balance !== 0);

        // 清算のステップを追加
        const updatedLiquidationSteps = [
            ...liquidationSteps,
            { creditor: creditor.user, debtor: debtor.user, payment }
        ];

        // 再帰的に次の清算ステップを処理
        return processLiquidation(updatedBalances, updatedLiquidationSteps);
    }, [])



    // ユーザーの収支を計算し、再帰的に清算を行う
    const calculateLiquidation = useCallback((group: User[], transactions: ExpenseTransaction[]) => {
        if (group.length > 0 && transactions.length > 0) {
            const userBalances = processUserBalances(group, transactions);
            setLiquidation(processLiquidation(userBalances, []));
        }
    }, [processLiquidation]);

    // ユーザーの収支を計算する
    const calculateUserBalance = useCallback((group: User[], transactions: ExpenseTransaction[]) => {
        if (group.length > 0 && transactions.length > 0) {
            const userBalances = processUserBalances(group, transactions);
            setUserBalances(userBalances);
        }
    }, [])
    return { liquidation, calculateLiquidation, userBalances, calculateUserBalance }
}
