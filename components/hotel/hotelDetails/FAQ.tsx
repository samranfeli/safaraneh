import { useTranslation } from 'next-i18next';

import parse from 'html-react-parser';
import { DomesticAccomodationType } from '@/types/hotel';
import Accordion from '@/components/shared/ui/Accordion';
import { QuestionCircle } from '@/components/shared/ui/icons';

type Props = {
    faqs?: DomesticAccomodationType['faqs'];
}

const FAQ: React.FC<Props> = props => {

    const { faqs } = props;

    const { t } = useTranslation('common');

    if (!faqs) {
        return null;
    }

    return (

        <div className='p-3 sm:p-5 lg:p-7 bg-white rounded-xl text-sm leading-7 md:text-base md:leading-7'>

            <h2 className='text-md lg:text-lg font-semibold mb-4'> {t("faq")} </h2>

            {faqs.map(item => (
                <Accordion
                    key={item.question}
                    title={<div>
                        <QuestionCircle className='w-5 h-5 mt-.5 rtl:ml-2 ltr:mr-2 fill-current inline-block' />
                        {item.question}
                    </div>}
                    content={parse(item.answer || "")}
                    WrapperClassName='mb-4'
                />
            ))}

        </div>

    )
}

export default FAQ;