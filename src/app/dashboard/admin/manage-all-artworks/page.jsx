import { allArtwork } from "@/lib/api/admin";
import ManageAllArtworksTable from "./ManageAllArtworksTable";


const ManageAllArtwork = async() => {
    const initialArtworks =await allArtwork();

    return (
       <div>
            <ManageAllArtworksTable initialArtworks={initialArtworks}></ManageAllArtworksTable>
       </div>
    );
};

export default ManageAllArtwork;