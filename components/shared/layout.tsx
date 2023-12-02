import Header from "./header";
import Footer from "./footer";
import Error from './Error';
import { PropsWithChildren, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { getPortal } from "@/actions/portalActions";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setReduxPortal } from "@/store/portalSlice";

const Layout: React.FC<PropsWithChildren> = props => {
    const router = useRouter();

    const { locale } = router;

    const dispatch = useAppDispatch();
    const portalInformation = useAppSelector(state => state.portal)

    const fetchPortalInfo = useCallback(async () => {
        const portalInfo = await getPortal();

        dispatch(setReduxPortal({
            MetaTags: portalInfo.data.MetaTags,
            Phrases: portalInfo.data.Phrases
        }));

        const portalName = portalInfo.data.Phrases.find((item: { Keyword: string }) => item.Keyword === 'Name');
        localStorage.setItem('whiteLabelProjectName', portalName.Value);

    }, []);

    useEffect(() => {
        if (portalInformation.Phrases.length) return;

        fetchPortalInfo();

    }, [portalInformation.Phrases.length, fetchPortalInfo]);


    return (
        <>
            <div className={`wrapper rtl:font-samim leading-7 ${process.env.THEME || ""} lang-${locale} ${locale === "fa" ? "rtl" : ""}`} >
                <Error />
                <Header />
                <main id="main" className='min-h-desktop-main relative z-10'>
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    )
}
export default Layout;