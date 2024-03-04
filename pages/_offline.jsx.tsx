import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Offline: NextPage = () => {

    return (
        <div className="max-w-container m-auto p-5 max-sm:p-3">
            offline ....
        </div>
    )
}

export default Offline;

export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}