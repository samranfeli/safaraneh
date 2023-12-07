import { useTranslation } from 'next-i18next';

import { HotelScoreDataType } from "@/types/hotel";
import UsersComments from './UsersComments';
import CommentForm from './CommentForm';

type Props = {
    hotelScoreData?: HotelScoreDataType;
    pageId: number;
}

const Comments: React.FC<Props> = props => {

    const { } = props;

    const { t } = useTranslation('common');

    return (
        <>
            <h4 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'> {t("suggestion")} </h4>

            {!!props.hotelScoreData && <UsersComments hotelScoreData={props.hotelScoreData} />}

            <CommentForm pageId={props.pageId} />

        </>
    )
}

export default Comments;