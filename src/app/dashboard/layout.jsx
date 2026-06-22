import { DashboardSidebar } from '@/Components/Shered/DashboardSidebar';
import React from 'react';

const DashboardLayoutPage = ({ children }) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <DashboardSidebar />

            <main className="flex-1 overflow-y-auto p-4 md:p-8 min-w-0">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayoutPage;