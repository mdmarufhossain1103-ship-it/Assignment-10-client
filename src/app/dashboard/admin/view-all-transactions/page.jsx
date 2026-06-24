
import { getAllPaymentHistory } from "@/lib/api/admin";
import TransactionsTable from "./TransactionsTable";


const ViewAllTransactions = async() => {
    const initialTransactions =await getAllPaymentHistory();


    return (
        <div>
            <TransactionsTable initialTransactions={initialTransactions}></TransactionsTable>
        </div>
    );
};

export default ViewAllTransactions;