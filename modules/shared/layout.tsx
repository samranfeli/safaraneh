import Header from "./components/header";
import Footer from "./components/footer";
import Error from './Error';
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "./hooks/use-store";

type Props = {
    logo:string;
    siteName:string;
    contactInfo :{
        tel?:string;
        instagram?:string;
        linkedin?:string;
        twitter?:string;
        facebook?:string;
    }
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {
    const router = useRouter();

    const { locale } = router;

    const isHeaderUnderMain = useAppSelector(state => state.styles.headerUnderMain);
    const isBodyScrollable = useAppSelector(state => state?.styles?.bodyScrollable);

    return (

        <div className={`wrapper leading-7 ${process.env.THEME || ""} lang-${locale} ${locale === "fa" ? "rtl" : ""} ${isBodyScrollable?"":"overflow-hidden h-screen lg:h-auto"}`} >
            <Error />
            <Header logo={props.logo} siteName={props.siteName} />
            <main id="main" className={`min-h-desktop-main relative ${isHeaderUnderMain?"z-50":"z-10"}`}>
                {props.children}
            </main>
            <Footer logo={props.logo} siteName={props.siteName} contactInfo={props.contactInfo} />
        </div>

    )
}
export default Layout;