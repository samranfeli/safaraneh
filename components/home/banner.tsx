import { useTranslation } from 'next-i18next';

//import HotelSearchForm from '../hotel/searchForm';
import {Apartment,Travel} from '../shared/ui/icons';
import Tabs from '../shared/ui/tabs';


const Banner :React.FC = () => {


  const {t} = useTranslation('common');
  const {t:tHome} = useTranslation('home');

    const items = [
        {
          key: '1',
          label: (<div className='text-center'> <Apartment className='w-6 h-6 fill-current block mx-auto mb-1' /> هتل داخلی </div>),
          children: '<HotelSearchForm />',
        },
        {
          key: '2',
          label: (<div className='text-center'> <Travel className='w-6 h-6 fill-current block mx-auto mb-1' /> پرواز داخلی </div>),
          children: 'فرم سرچ پرواز',
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