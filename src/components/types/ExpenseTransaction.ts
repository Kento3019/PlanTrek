import { User } from "./User";

export type ExpenseTransaction = {
    tid: string;                // トランザクションID
    date: string;              // 日付
    content: string;
    payer: User;               // 支払者
    involves: Array<User>;     // 関連ユーザー
    amount: number;            // 金額
};
