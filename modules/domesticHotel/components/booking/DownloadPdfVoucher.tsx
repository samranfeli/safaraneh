import useHttp from '@/modules/shared/hooks/use-http';
import { Header } from '@/enum/url';
import { i18n, useTranslation } from 'next-i18next';
import { AxiosResponse } from 'axios';
import { Ticket } from '@/modules/shared/components/ui/icons';

type Props = {
    reserveId: string;
    username: string;
    className: string;
}

const DownloadPdfVoucher: React.FC<Props> = props => {

    const { t } = useTranslation("payment");

    const { sendRequest, loading } = useHttp();

    const handleClick = async () => {

        sendRequest({
            url: `https://hotelv2.safaraneh.com/api/services/app/Reserve/GetVoucherPdf?ReserveId=${props.reserveId}&Username=${props.username}`,
            header: {
                ...Header,
                "Accept-Language": i18n?.language === "fa" ? "fa-IR" : "en-US",
            },
            method: 'get'
        }, (response: AxiosResponse) => {
            if (response?.data?.result) {
                const url = `https://hotelv2.safaraneh.com/File/DownloadTempFile?filename=${response.data.result.fileName}.pdf&fileType=${response.data.result.fileType}&fileToken=${response.data.result.fileToken}`;
                let a = document.createElement('a');
                a.href = url;
                a.click();
            }
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className={props.className}
        >

            {loading ? (
                <>
                    <span className="animate-spin block border-2 border-white rounded-full border-r-transparent border-t-transparent w-5 h-5" />
                    {t("loading-recieve-voucher")}
                </>
            ) : (
                <>
                    <Ticket className='w-5 h-5 fill-current -rotate-45' />
                    {t("recieve-voucher")}
                </>
            )}

        </button>
    )
}

export default DownloadPdfVoucher;