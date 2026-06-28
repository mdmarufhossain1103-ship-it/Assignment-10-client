
import { showPaymentData } from '@/lib/actions/payment';
import PaymentTable from './PaymentTable';

const UserDashboard = async () => {
    const purchases = await showPaymentData();
    return <PaymentTable purchases={purchases} />;
};

export default UserDashboard;