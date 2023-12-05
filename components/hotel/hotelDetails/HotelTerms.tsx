import { useTranslation } from 'next-i18next';
import parse from 'html-react-parser';

import { DomesticAccomodationType, DomesticHotelDetailType } from "@/types/hotel";

import Image from 'next/image';


type Props = {
    instruction?: DomesticAccomodationType['instruction']
    mendatoryFee?: DomesticAccomodationType['mendatoryFee']
    policies?: DomesticHotelDetailType['Policies']
}

const HotelTerms: React.FC<Props> = props => {

    const { instruction, mendatoryFee, policies } = props;

    const { t } = useTranslation('common');

    if (!policies) {
        return null;
    }

    return (
        <>
            <h4 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'> {t("terms")} </h4>

            <div className='p-3 sm:p-5 lg:p-7 bg-white rounded-xl'>
                <h5 className='text-sm md:text-base font-semibold mb-5'>{t("hotel-terms")}</h5>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-16'>
                    <div>
                        {policies?.map(item => (
                            <div key={item.Title} className='flex justify-between mb-2 md:mb-4'>
                                <div className='text-sm'>
                                    {!!item.Title && <Image src={item.Image!} alt={item.ImageAlt || item.Title || ""} width={20} height={20} className='inline-block rtl:ml-2 ltr:mr-2' />}
                                    {item.Title}
                                </div>

                                <div>
                                    {item.Description}
                                </div>
                            </div>)
                        )}

                    </div>
                    <div className='md:col-span-2 inserted-content text-justify leading-7 text-sm md:text-base md:leading-7'>
                        {!!instruction && parse(instruction)}
                        {!!mendatoryFee && parse(mendatoryFee)}
                    </div>

                </div>



            </div>

        </>
    )
}

export default HotelTerms;