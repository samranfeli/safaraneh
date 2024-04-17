import parse from 'html-react-parser';

type Props = {
    content?: string;
    siteUrl: string;
    siteName: string;
}

const CipAboutAirport: React.FC<Props> = props => {
    const { content, siteName, siteUrl } = props;

    if (!content) {
        return null;
    }

    const editedContent = content.replace(/سفرانه/g, siteName)
        .replace(/http:\/\/www.safaraneh.com/g, siteUrl)
        .replace(/https:\/\/safaraneh.com/g, siteUrl);

    return (
        <div className='py-2 md:py-5'>
            <strong className="block font-semibold text-lg mb-5"> درباره فرودگاه </strong>

            <div className='bg-white inserted-content rounded-lg border border-neutral-300 text-justify p-3 md:p-8 text-sm sm:text-base sm:leading-8 pb-2 sm:pb-5'>
                {parse(editedContent)}
            </div>
        </div>
    )
}

export default CipAboutAirport;