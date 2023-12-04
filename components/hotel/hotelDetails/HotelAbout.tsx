import { useTranslation } from 'next-i18next';

import parse from 'html-react-parser';

type Props = {
    description?: string;
    portalAddress: string;
    portalName: string;
}

const HotelAbout: React.FC<Props> = props => {

    const { portalName, description, portalAddress } = props;

    const { t } = useTranslation('common');

    if (!description) {
        return "loading..."
    }

    return (
        <>
            <h4 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'> {t("about-hotel")} </h4>

            <div className='p-3 sm:p-5 lg:p-7 bg-white rounded-xl text-justify inserted-content text-sm leading-7 md:text-base md:leading-7'>
                {parse(`${description.replace(/سفرانه/g, portalName)
                    .replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g, "/")
                    .replace(/http:\/\/www.safaraneh.com/g, portalAddress)
                    .replace(/https:\/\/safaraneh.com/g, portalAddress)}`)}
            </div>

        </>
    )
}

export default HotelAbout;