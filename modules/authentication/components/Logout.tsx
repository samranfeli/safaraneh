import { useAppDispatch } from "@/modules/shared/hooks/use-store";
import { setReduxBalance, setReduxUser } from "../store/authenticationSlice";
import { useRouter } from "next/router";

type Props = {
    closeModal?: () => void;
}

const Logout: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const router = useRouter();

    const logout = () => {

        dispatch(setReduxUser({
            isAuthenticated: false,
            user: {},
            getUserLoading: false
        }));

        dispatch(setReduxBalance({balance:undefined, loading:false}));

        localStorage.removeItem('Token');

        if (props.closeModal) {
            props.closeModal();
        }

        router.replace("/");
    }

    return (
        <button
            className='text-red-600 text-xs'
            type='button'
            onClick={logout}
        >
            خروج از حساب کاربری
        </button>
    )
}

export default Logout;