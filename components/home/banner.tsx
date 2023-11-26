import { useTranslation } from 'next-i18next';

import SearchForm from '../hotel/SearchForm';
import {Apartment,Travel} from '../shared/ui/icons';
import Tabs from '../shared/ui/tabs';
import { TabItem } from '@/types/common';
import Image from 'next/image';


const Banner :React.FC = () => {


  const {t} = useTranslation('common');
  const {t:tHome} = useTranslation('home');

    const items: TabItem[] = [
        {
          key: '1',
          label: (<div className='text-center'> <Apartment className='w-6 h-6 fill-current block mx-auto mb-1' /> {t('domestic-hotel')} </div>),
          children: <SearchForm />,
        },
        {
          key: '2',
          label: (<div className='text-center'> <Travel className='w-6 h-6 fill-current block mx-auto mb-1' /> {t('domestic-flight')} </div>),
          children: (<div className='py-20'></div>),
        }
    ];

    return(
        <div className="relative">
            <Image 
              src='/images/home/banner.jpg'
              alt="blue sky"
              width={1900}
              height={414}
              priority
              className='absolute top-0 left-0 w-full h-full object-cover object-center z-10'
            />
             <div className="max-w-container mx-auto pt-5 sm:px-3 sm:py-10 sm:pb-28 relative z-20">

                <h1 className="text-white text-center font-bold text-xl sm:text-3xl mb-6 sm:mb-10" > {tHome("Plan-your-trip")} </h1>
                
                <div className="px-5 pt-3 sm:p-5 bg-white sm:rounded-lg">
                   <Tabs items={items} />
                </div>


             </div>
        </div>
    )
}


export default Banner;