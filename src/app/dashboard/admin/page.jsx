import { getUsers } from "@/lib/api/admin";
import AdminManagementTable from "./AdminManagementTable";


export default async function AdminDashboardPage() {
    const initialUsers = await getUsers()
    return (
       <div>
            <AdminManagementTable initialUsers={initialUsers}></AdminManagementTable>
       </div>
    );
}