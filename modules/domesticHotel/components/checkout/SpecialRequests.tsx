import {useState} from 'react';

import { DownCaret } from "@/modules/shared/components/ui/icons";
import { useTranslation } from 'next-i18next';
import { Field } from 'formik';

type Props ={

}

const SpecialRequests:React.FC<Props> = () =>{

    const {t} = useTranslation('common');

    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen(prevState=>!prevState);
    }

    return(
                    
        <div className='pt-4'>

        <button 
          type='button'
          onClick={toggleOpen}
          className='text-blue-500 inline-flex gap-1 items-center text-sm font-semibold'
        >
          <DownCaret className={`w-5 h-5 fill-current transition-all ${open?"-rotate-180":""}`} />
          {t('special-requests')}
        </button>

        {!!open && (
            <Field
                as="textarea"
                name='specialRequest'
                rows={4}
                className='w-full border border-neutral-300 focus:border-blue-500 rounded-md px-2 py-1 text-sm outline-none'
                placeholder={t('special-requests-desc')}
            />
        )}

      </div>
    )
}

export default SpecialRequests;