import { useTranslation } from 'next-i18next';

import parse from 'html-react-parser';

type Props = {
    description?: string;
    siteUrl: string;
    siteName: string;
}

const HotelAbout: React.FC<Props> = props => {

    const { siteName, description, siteUrl } = props;

    const { t:tHotel } = useTranslation('hotelDetail');

    if (!description) {
        return "loading..."
    }

    return (
        <>
            <h2 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'> {tHotel("about-hotel")} </h2>

            <div className='p-3 sm:p-5 lg:p-7 bg-white rounded-xl text-justify inserted-content text-sm leading-7 md:text-base md:leading-7'>
                {parse(`${description.replace(/سفرانه/g, siteName)
                    .replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g, "/")
                    .replace(/http:\/\/www.safaraneh.com/g, siteUrl)
                    .replace(/https:\/\/safaraneh.com/g, siteUrl)}`)}
            </div>

        </>
    )
}

export default HotelAbout;