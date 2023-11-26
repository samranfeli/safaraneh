import { useTranslation } from 'next-i18next';

import SearchForm from '../hotel/SearchForm';
import {Apartment,Travel} from '../shared/ui/icons';
import Tabs from '../shared/ui/tabs';
import { TabItem } from '@/types/common';


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
        <div className="bg-banner bg-no-repeat bg-cover">
             <div className="max-w-container mx-auto px-3 py-10 pb-28">

                <h1 className="text-white text-center font-bold text-3xl mb-10" > {tHome("Plan-your-trip")} </h1>
                
                <div className="p-5 bg-white rounded-lg">
                   <Tabs items={items} />
                </div>


             </div>
        </div>
    )
}


export default Banner;