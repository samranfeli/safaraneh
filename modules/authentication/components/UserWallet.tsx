import { getUserBalance } from "@/modules/payment/actions";
import { useAppDispatch, useAppSelector } from "@/modules/shared/hooks/use-store";
import Link from "next/link";
import { useEffect } from 'react';
import { setReduxBalance } from "../store/authenticationSlice";
import { numberWithCommas } from "@/modules/shared/helpers";


const UserWallet = () => {
    const dispatch = useAppDispatch();

    const balance = useAppSelector(state => state.authentication.balance);

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('Token');
            if (token) {
                const response: any = await getUserBalance(token, "IRR");
                if (response.data?.result?.amount !== null) {
                    dispatch(setReduxBalance(response?.data?.result?.amount))
                }
            }
        }
        fetchBalance();
    }, []);

    return (

        <Link
            className="h-12 py-2.5 text-sm text-blue-700 hover:text-blue-500 ltr:mr-5 ltr:float-right rtl:ml-5 rtl:float-left hidden md:block"
            href="/myaccount/wallet"
        >
            کیف پول : {numberWithCommas(balance || 0)} ریال
        </Link>
    )
}
export default UserWallet;