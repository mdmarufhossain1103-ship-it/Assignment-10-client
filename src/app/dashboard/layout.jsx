import { DashboardSidebar } from '@/Components/Shered/DashboardSidebar';
import React from 'react';

const DashboardLayoutPage = ({children}) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayoutPage;