import { useTranslation } from 'next-i18next';

import { HotelScoreDataType } from "@/types/hotel";
import UsersComments from './UsersComments';

type Props = {
    hotelScoreData?: HotelScoreDataType;
}

const Comments: React.FC<Props> = props => {

    const { } = props;

    const { t } = useTranslation('common');

    return (
        <>
            <h4 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'> {t("suggestion")} </h4>

            {!!props.hotelScoreData && <UsersComments hotelScoreData={props.hotelScoreData} />}

        </>
    )
}

export default Comments;