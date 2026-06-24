import { ShowArtistArt } from '@/lib/api/artist';
import React from 'react';
import EditTable from './EditTable';

const EditArtwork = async() => {
    const artworks = await ShowArtistArt();
    return (
        <div>
            <EditTable artworks={artworks}></EditTable>
        </div>
    );
};

export default EditArtwork;