
import { useTranslation } from "next-i18next";
import Router from "next/router";

// import { Error as ErrorIcon } from "../../dist/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import { setReduxError } from '../../store/errorSlice';

const Error: React.FC = () => {

    const { t } = useTranslation("common");

    const storedError = useAppSelector(state => state.error);

    const dispatch = useAppDispatch();

    const closeHandler = () => {
        dispatch(setReduxError({
            title: "",
            message: "",
            isVisible: false,
            closeErrorLink: "",
            closeButtonText: ""
        }));
    }

    const backTo = (target:string) => {
        Router.push(target);
        closeHandler();
    }

    if (storedError.isVisible) {
        return (
            // <Modal
            //     title={storedError.title || t('error')}
            //     open={storedError.isVisible}
            //     onCancel={storedError.closeErrorLink ? undefined : closeHandler}
            //     maskClosable={!storedError.closeErrorLink}
            //     width={400}
            //     footer={<div className="text-center pt-4 pb-10">

            //         {storedError.closeErrorLink ? (
            //             <button type="button" className="btn-yellow w-32" onClick={()=>{backTo(storedError.closeErrorLink!)}}>
            //                 {storedError.closeButtonText || t('home')}
            //             </button>
            //         ) : (
            //             <button type="button" className="btn-yellow w-32" onClick={closeHandler}>
            //                 {t('close')}
            //             </button>
            //         )}

            //     </div>}
            //     className="text-center error-modal"
            // >
            //     <ErrorIcon className="w-24 mx-auto" />
            //     <div className="text-red-600 mt-4 md:mt-6 font-semibold leading-7">
            //         {storedError.message}
            //     </div>
            // </Modal>
            'error'
        )
    }

    return null;
}

export default Error;