import Header from "./header";
import Footer from "./footer";
import Error from './Error';
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

const Layout : React.FC<PropsWithChildren> = props => {
    const router = useRouter();

    const { locale } = router;

    return(
        <>
            <div className={`wrapper rtl:font-fa leading-7 ${process.env.THEME || ""} lang-${locale} ${locale==="fa"?"rtl":""}`} >
                <Error />
                <Header />
                <main id="main">
                    {props.children}
                </main>
                <Footer />          
            </div>
        </>
    )
}
export default Layout;