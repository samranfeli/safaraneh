import { useTranslation } from 'next-i18next';

import { Headset, PersentBadge, Discount, ImmediateVoucher } from '../shared/ui/icons';
import { useAppSelector } from '@/hooks/use-store';

const Services: React.FC = () => {

    const { t } = useTranslation('common');

    const portalPhrases = useAppSelector(state => state.portal.Phrases);
    const projectName = portalPhrases.find(item => item.Keyword === "Name")?.Value;

    const iconsClassName = "block mx-auto w-14 h-14 mb-8 mt-4";

    const services: {
        icon: React.ReactNode;
        title: string;
        description: string;
    }[] = [
            {
                icon: <Headset className={iconsClassName} />,
                title: t('service1'),
                description: t('service1-desc', { portalName: projectName })
            },
            {
                icon: <PersentBadge className={iconsClassName} />,
                title: t('service2'),
                description: t('service2-desc', { portalName: projectName })
            },
            {
                icon: <Discount className={iconsClassName} />,
                title: t('service3'),
                description: t('service3-desc', { portalName: projectName })
            },
            {
                icon: <ImmediateVoucher className={iconsClassName} />,
                title: t('service4'),
                description: t('service4-desc', { portalName: projectName })
            },
        ]

    return (
        <div className="max-w-container mx-auto p-5 md:py-10">

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

                {services?.map(service => (

                    <div key={service.title} className='bg-white p-5 rounded-lg border border-neutral-200'>
                        {service.icon}
                        <h2 className='font-semibold text-neytral-600 mb-6 text-center'>{service.title}</h2>
                        <p className='text-xs leading-5 text-justify'> {service.description}</p>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Services;