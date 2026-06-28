import { requireRole } from '@/lib/actions/role';
import React from 'react';

const UserLayoutPage = async({children}) => {
    await requireRole('user');
    return children;
};

export default UserLayoutPage;