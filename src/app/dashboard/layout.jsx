import { DashboardSidebar } from '@/Components/Shered/DashboardSidebar';
import React from 'react';

const DashboardLayoutPage = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar></DashboardSidebar>
            <div>{children}</div>
        </div>
    );
};

export default DashboardLayoutPage;