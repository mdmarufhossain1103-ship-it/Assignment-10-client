import { requireRole } from '@/lib/actions/role';
import React from 'react';

const ArtistLayoutPage = async({children}) => {
    await requireRole('artist')
  return children;
};

export default ArtistLayoutPage;