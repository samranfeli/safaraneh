import { SetStateAction } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { CalendarBeautiful, UserBeautiful, Close, EditBeautiful, LeftCaret, WalletBeautiful, User, InfoCircle, User2, Lock2 } from '@/modules/shared/components/ui/icons';
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import Logout from './Logout';

type Props = {
    setDelayedOpen?: (value: SetStateAction<boolean>) => void;
    isInModal?: boolean;
}

const AccountSidebar: React.FC<Props> = props => {

    const { setDelayedOpen } = props;

    const { t } = useTranslation('common');

    const user = useAppSelector(state => state.authentication.user);

    let confirmMark: React.ReactNode;

    if (user?.isEmailConfirmed || user?.isPhoneNumberConfirmed) {
        confirmMark = null;
    } else {
        confirmMark = (
            <InfoCircle className='w-5 h-5 fill-amber-500' />
        )
    }

    return (
        <>
            {!!props.isInModal && <div className='flex justify-between mb-2 border-b border-neutral-200'>
                <button
                    className='p-3'
                    type='button'
                    aria-label={t('close')}
                    onClick={() => {
                        if (setDelayedOpen) {
                            setDelayedOpen(false)
                        }
                    }}
                >
                    <Close className='w-6 h-6 fill-neutral-400' />
                </button>
                <Link
                    href="/myaccount/profile"
                    className='text-sm hover:text-blue-600 p-3 px-5'
                >
                    پروفایل
                </Link>
            </div>}

            <div className={props.isInModal ? 'p-4 sm:p-5' : ""}>

                <div className={`text-center ${props.isInModal ? "" : "bg-white mb-4 rounded-md border border-neutral-300"}`}>

                    <UserBeautiful className='inline-block sm:my-8' />

                    <h5 className='font-semibold text-lg mb-2 sm:mb-5'>
                        {t("hello")} {user?.firstName || t('dear-user')}
                    </h5>

                    {!!user?.emailAddress && <div className='mb-2 sm:mb-5 font-sans'>
                        {user.emailAddress}
                    </div>}

                    <Link
                        href="/myaccount/profile"
                        className='text-xs text-red-600 inline-flex items-center gap-1 mb-5 sm:mb-10'
                    >
                        <EditBeautiful className='block fill-current' /> {t("edit-profile")}
                    </Link>

                </div>

                {!!(user?.emailAddress && !user.isEmailConfirmed) && (
                    <div className="bg-[#f5e9ca] text-xs flex items-center gap-1 px-3 py-2 mb-5 rounded border border-orange-300">
                        <InfoCircle className='w-5 h-5 fill-orange-400' />
                        {t("confirm-email")}
                    </div>
                )}

                <Link
                    href="/myaccount/booking"
                    className='bg-white border border-neutral-300 rounded-md flex items-center justify-between p-3 mb-4'
                >
                    <div className='flex items-center gap-3 whitespace-nowrap'>
                        <CalendarBeautiful className='w-8 h-8' />
                        {t('my-reserve')}
                    </div>

                    <LeftCaret className='w-6 h-6 fill-blue-600' />

                </Link>

                <Link
                    href="/myaccount/wallet"
                    className='bg-white border border-neutral-300 rounded-md flex items-center justify-between p-3 mb-4'
                >
                    <div className='flex items-center gap-3 whitespace-nowrap'>
                        <WalletBeautiful className='w-8 h-8' />
                        کیف پول
                    </div>

                    <LeftCaret className='w-6 h-6 fill-blue-600' />

                </Link>

                <div className='bg-white border border-neutral-300 rounded-md px-3'>
                    <Link
                        href="/myaccount/profile"
                        className='flex items-center justify-between py-3'
                    >
                        <div className='flex items-center gap-3 whitespace-nowrap'>
                            <User2 className='w-8 h-8' />
                            <div>
                                پروفایل
                                <p className='text-2xs text-neutral-400 mt-1'>
                                    {t('visit-edit-account-informaion')}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            {confirmMark}
                            <LeftCaret className='w-6 h-6 fill-blue-600' />
                        </div>

                    </Link>

                    <hr />

                    <Link
                        href="/myaccount/password"
                        className='flex items-center justify-between py-3'
                    >
                        <div className='flex items-center gap-3 whitespace-nowrap'>
                            <Lock2 className='w-8 h-8' />
                            <div>
                                کلمه عبور
                                <p className='text-2xs text-neutral-400 mt-1'>
                                    تغییر کلمه عبور
                                </p>
                            </div>
                        </div>

                        <LeftCaret className='w-6 h-6 fill-blue-600' />

                    </Link>

                    <hr />

                    <div className='p-6 text-center'>
                        <Logout
                            closeModal={() => {
                                if (setDelayedOpen) {
                                    setDelayedOpen(false)
                                }
                            }}
                        />
                    </div>

                </div>

            </div>
        </>
    )
}

export default AccountSidebar;