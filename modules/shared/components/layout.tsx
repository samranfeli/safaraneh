import Header from "./header";
import Footer from "./footer";
import Error from './Error';
import { PropsWithChildren, useEffect , useState} from "react";
import { useRouter } from "next/router";
import {useAppSelector } from "../hooks/use-store";
import PageLoadingBar from "./ui/PageLoadingBar";

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

    const [loading, setLoading]= useState<boolean>(false);

    const isHeaderUnderMain = useAppSelector(state => state.styles.headerUnderMain);
    const isBodyScrollable = useAppSelector(state => state?.styles?.bodyScrollable);

    const addLoading = () => {
        setLoading(true);
        setTimeout(removeLoading, 4000);
    }
    const removeLoading = () => {setLoading(false)}


    useEffect(()=>{

        removeLoading();

        document.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', addLoading)
        });
        
        return(()=>{
            document.querySelectorAll('a').forEach(item => {
                item.removeEventListener('click', addLoading )
            });
        })
    },[router.asPath]);

    return (

        <div className={`wrapper leading-7 ${process.env.THEME || ""} lang-${locale} ${locale === "fa" ? "rtl" : ""} ${isBodyScrollable?"":"overflow-hidden h-screen"}`} >
            
            <PageLoadingBar active={loading} />

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