import { requireRole } from '@/lib/actions/role';
import React from 'react';

const AdminLayoutPage = async({children}) => {
    await requireRole('admin');
    return children;
};

export default AdminLayoutPage;