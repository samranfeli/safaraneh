import { useState, useEffect } from 'react';
import { useTranslation } from "next-i18next";
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { setBodyScrollable } from '@/modules/shared/store/stylesSlice';
import Link from 'next/link';
import { Close } from '@/modules/shared/components/ui/icons';
import LognWithPassword from './LognWithPassword';
import OTPLogin from './OTPLogin';


const HeaderAuthentication: React.FC = () => {

    const { t } = useTranslation('common');

    const dispatch = useAppDispatch();

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

    return (
        <>
            <button
                type="button"
                aria-label={t('sign-in-up')}
                className="h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left hidden md:block"
                onClick={() => { setOpen(true) }}
            >

                {t('sign-in-up')}

            </button>

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div
                    className={`fixed left-0 right-0 top-0 bottom-0 bg-black/75 duration-200 transition-all ${delayedOpen ? "opacity-100 backdrop-blur" : "opacity-0"}`}
                    onClick={() => { setDelayedOpen(false) }}
                />

                <div className={`fixed top-0 h-screen overflow-auto pb-5 rtl:left-0 ltr:right-0 w-screen sm:w-520 bg-white duration-200 transition-all ${delayedOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
                    <div className='flex justify-between mb-2'>
                        <button
                            className='p-3'
                            type='button'
                            aria-label={t('close')}
                            onClick={() => { setDelayedOpen(false) }}
                        >
                            <Close className='w-6 h-6 fill-neutral-400' />
                        </button>
                        <Link
                            href="/signin"
                            className='text-blue-600 p-3 px-5'
                        >
                            {t('sign-in-up')}
                        </Link>
                    </div>

                    <div className='px-5'>
                        <div className='bg-blue-gradient text-white p-4 rounded-md'>
                            <h6 className='mb-4 font-semibold'> {t('sign-in-h6')} </h6>
                            <ul className='text-2xs list-disc rtl:pr-5 ltr:pl-5'>
                                <li className='mb-1'> {t('sign-in-desc-list-1')} </li>
                                <li className='mb-1'> {t('sign-in-desc-list-2')} </li>
                                <li className='mb-1'> {t('sign-in-desc-list-3')} </li>
                                <li className='mb-1'> {t('sign-in-desc-list-4')} </li>
                                <li className='mb-1'> {t('sign-in-desc-list-5')} </li>
                                <li className='mb-1'> {t('sign-in-desc-list-6')} </li>
                            </ul>
                        </div>
                    </div>

                    <hr className='my-10' />

                    {loginWithPassword ? (
                        <LognWithPassword />
                    ) : (
                        <OTPLogin />
                    )}

                    <div className='px-5 text-center'>
                        {!!loginWithPassword && (
                                <Link
                                    className='text-sm text-blue-700 hover:text-blue-600 block mx-auto mb-4'
                                    href="/forget"
                                >
                                    {t("forget-password")}
                                </Link>
                        )}
                        <button
                            type='button'
                            className='text-sm text-blue-700 hover:text-blue-600'
                            onClick={() => { setLoginWithPassword(prevState => !prevState) }}
                        >
                            {loginWithPassword ? t("sign-in-up") : t("sign-in-with-password")}

                        </button>
                    </div>
                </div>

            </ModalPortal>
        </>
    )
}

export default HeaderAuthentication;