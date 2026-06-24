import React from 'react';
import { ShowArtistArt } from '@/lib/api/artist';
import ArtistTable from './ArtistTable';



const ArtistDashboardPage = async() => {

    const artworks = await ShowArtistArt();
    return (
       <div>
            <ArtistTable artworks={artworks}></ArtistTable>
       </div>
    );
};

export default ArtistDashboardPage;