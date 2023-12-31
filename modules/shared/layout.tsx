import Header from "./components/header";
import Footer from "./components/footer";
import Error from './Error';
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

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

    return (

        <div className={`wrapper rtl:font-samim leading-7 ${process.env.THEME || ""} lang-${locale} ${locale === "fa" ? "rtl" : ""}`} >
            <Error />
            <Header logo={props.logo} siteName={props.siteName} />
            <main id="main" className='min-h-desktop-main relative z-10'>
                {props.children}
            </main>
            <Footer logo={props.logo} siteName={props.siteName} contactInfo={props.contactInfo} />
        </div>

    )
}
export default Layout;