import parse from 'html-react-parser';
import moment from 'moment-jalaali';

type Props = {
    comment: {
        CommentId?: number;
        FullName?: string;
        CityName?: string;
        Comment?: string;
        IsRecommended?: boolean;
        Satisfaction?: number;
        RoomService?: number;
        ResturantQuality?: number;
        DealWithPassanger?: number;
        CreateDate?: string;
        PageUrl?: string;
        IsStay?: boolean;
    }
}

const CommentItem: React.FC<Props> = props => {

    const { comment } = props;

    return (
        <div className='mb-5 pb-5 border-b border-neutral-300 text-sm'>

            <div className='font-bold text-lg'>{(comment.Satisfaction || 0) / 10} از 10</div>

            <div className='font-semibold'> {comment.FullName} </div>

            {comment.CreateDate && (
                <div className="text-neutral-400 text-xs">
                    {moment(comment.CreateDate).format("jDD jMMMM jYYYY")}
                </div>
            )}

            <div className='text-neutral-400 text-xs'> {comment.CityName} </div>

            {!!comment.Comment && parse(comment.Comment)}

        </div>
    )
}

export default CommentItem;

