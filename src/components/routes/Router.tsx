import { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { LinkCreationPage } from '../Pages/LinkCreationPage';
import { UserGroupPage } from '../Pages/UserGroupPage';
import { GroupProvider } from '../provider/GroupProvider';
import { LedgerOverviewPage } from '../Pages/LedgerOverviewPage';
import { PageTemplate } from '../templates/PageTemplate';
import { TransactionManagementPage } from '../Pages/TransactionManagementPage';
import { SchedulePage } from '../Pages/SchedulePage';
import { CategoriesProvider } from '../provider/CategoryProvider';
import { CategoryUpdatePage } from '../Pages/CategoryUpdatePage';
import { HomePage } from '../Pages/HomePage';
import { ExpenseTransactionsProvider } from '../provider/ExpenseTransactionProvider';
import { SchedulesProvider } from '../provider/SchedulesProvider';
import { ScheduleFormPage } from '../Pages/ScheduleFormPage';
import { TransactionFormPage } from '../Pages/TransactionFormPage';

export const Router = () => {

    const ScrollToTop = () => {
        const location = useLocation(); // 現在の場所（URL）

        useEffect(() => {
            window.scrollTo(0, 0); // ページ遷移時に一番上にスクロール
        }, [location]);

        return null; // レンダリングする必要はないので、nullを返す
    };

    return (
        <>
            <GroupProvider>
                <CategoriesProvider>
                    <SchedulesProvider>
                        <ExpenseTransactionsProvider>
                            <ScrollToTop />
                            <Routes>
                                <Route path="/" element={<PageTemplate><HomePage /></PageTemplate>} />
                                <Route path="/new" element={<PageTemplate><UserGroupPage /></PageTemplate>} />
                                <Route path="/:uuid/user" element={<PageTemplate><UserGroupPage /></PageTemplate>} />
                                <Route path="/:uuid/group" element={<PageTemplate><LinkCreationPage /></PageTemplate>} />
                                <Route path="/:uuid/schedule" element={
                                    <PageTemplate>
                                        <SchedulePage />
                                    </PageTemplate>
                                }></Route>
                                <Route path="/:uuid/schedule/form" element={
                                    <PageTemplate>
                                        <ScheduleFormPage />
                                    </PageTemplate>
                                }></Route>
                                <Route path="/:uuid/schedule/category" element={
                                    <PageTemplate>
                                        <CategoryUpdatePage />
                                    </PageTemplate>
                                }></Route>
                                <Route path="/:uuid/transaction" element={
                                    <PageTemplate>
                                        <TransactionManagementPage />
                                    </PageTemplate>
                                }></Route>
                                <Route path="/:uuid/transaction/overview" element={
                                    <PageTemplate>
                                        <LedgerOverviewPage />
                                    </PageTemplate>
                                }></Route>
                                <Route path="/:uuid/transaction/form" element={
                                    <PageTemplate>
                                        <TransactionFormPage />
                                    </PageTemplate>
                                }></Route>
                            </Routes >
                        </ExpenseTransactionsProvider>
                    </SchedulesProvider>
                </CategoriesProvider>
            </GroupProvider>
        </>
    );
}
