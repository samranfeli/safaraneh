import parse from 'html-react-parser';

type Props = {
    content?: string;
    siteUrl: string;
    siteName: string;
}

const CipAboutAirport: React.FC<Props> = props => {
    const { content , siteName, siteUrl} = props;

    if (!content) {
        return null;
    }

    const editedContent = content.replace(/سفرانه/g, siteName)
    .replace(/http:\/\/www.safaraneh.com/g, siteUrl)
    .replace(/https:\/\/safaraneh.com/g, siteUrl);

    return (
        <div className="py-5 " id="anchoraboutairport">
            
            <strong className="block font-semibold text-lg mb-5"> درباره فرودگاه </strong>
            
            <div className='bg-white inserted-content rounded-lg border border-neutral-300 p-5 mb-5 md:mb-8 text-base leading-8'>
                {parse(editedContent)}
            </div>
            
        </div>
    )
}

export default CipAboutAirport;