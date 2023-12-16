import { useTranslation } from 'next-i18next';

import { Headset, PersentBadge, Discount, ImmediateVoucher } from '../../shared/components/ui/icons';

type Props = {
    siteName:string;
}

const Services: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const iconsClassName = "block mx-auto w-14 h-14 mb-8 mt-4";

    const services: {
        icon: React.ReactNode;
        title: string;
        description: string;
    }[] = [
            {
                icon: <Headset className={iconsClassName} />,
                title: t('service1'),
                description: t('service1-desc', { portalName: props.siteName })
            },
            {
                icon: <PersentBadge className={iconsClassName} />,
                title: t('service2'),
                description: t('service2-desc', { portalName: props.siteName })
            },
            {
                icon: <Discount className={iconsClassName} />,
                title: t('service3'),
                description: t('service3-desc', { portalName: props.siteName })
            },
            {
                icon: <ImmediateVoucher className={iconsClassName} />,
                title: t('service4'),
                description: t('service4-desc', { portalName: props.siteName })
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