import { useState, useEffect } from 'react';
import { useTranslation } from "next-i18next";
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import { setBodyScrollable } from '@/modules/shared/store/stylesSlice';
import Link from 'next/link';
import { Close } from '@/modules/shared/components/ui/icons';
import LognWithPassword from './LognWithPassword';
import OTPLogin from './OTPLogin';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import UserWallet from './UserWallet';
import AccountSidebar from './AccountSidebar';
import LoginSidebar from './LoginSidebar';
import { useRouter } from 'next/router';


const HeaderAuthentication: React.FC = () => {

    const { t } = useTranslation('common');

    const dispatch = useAppDispatch();
    
    const router = useRouter();

    const path = router.asPath;

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const userLoginLoading = useAppSelector(state => state.authentication.getUserLoading);

    const [open, setOpen] = useState<boolean>(false);
    const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

    const [loginWithPassword, setLoginWithPassword] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setTimeout(() => { setDelayedOpen(true) }, 100);
            dispatch(setBodyScrollable(false));
        } else {
            dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!delayedOpen) {
            setTimeout(() => { setOpen(false) }, 200);
        }
    }, [delayedOpen]);

    useEffect(()=>{
        setDelayedOpen(false)
    },[path]);

    return (
        <>
            {userLoginLoading ? (
                <Skeleton className='w-20 ltr:float-right rtl:float-left hidden md:block mt-4' />
            ) : userIsAuthenticated ? (
                <>
                    <button
                        type="button"
                        aria-label={t('sign-in-up')}
                        className="h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left hidden md:block"
                        onClick={() => { setOpen(true) }}
                    >

                        حساب کاربری

                    </button>

                    <UserWallet />

                </>
            ) : (
                <button
                    type="button"
                    aria-label={t('sign-in-up')}
                    className="h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left hidden md:block"
                    onClick={() => { setOpen(true) }}
                >

                    {t('sign-in-up')}

                </button>
            )}

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div
                    className={`fixed left-0 right-0 top-0 bottom-0 bg-black/75 duration-200 transition-all ${delayedOpen ? "opacity-100 backdrop-blur" : "opacity-0"}`}
                    onClick={() => { setDelayedOpen(false) }}
                />

                <div className={`fixed top-0 h-screen overflow-auto pb-5 rtl:left-0 ltr:right-0 w-screen sm:w-520 bg-white duration-200 transition-all ${delayedOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>

                    {userIsAuthenticated ? (
                        <AccountSidebar
                            isInModal
                            setDelayedOpen={setDelayedOpen}
                        />
                    ) : (
                        <LoginSidebar
                            loginWithPassword={loginWithPassword}
                            setDelayedOpen={setDelayedOpen}
                            setLoginWithPassword={setLoginWithPassword}
                            toggleLoginType={() => { setLoginWithPassword(prevState => !prevState) }}
                        />
                    )}

                </div>

            </ModalPortal>
        </>
    )
}

export default HeaderAuthentication;