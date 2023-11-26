
import { TabItem } from '@/types/common';
import { useState } from 'react';

type Props = {
    items: TabItem[];
}

const Tabs: React.FC<Props> = props => {

    const { items } = props;

    const [activetabKey, setActiveTabKey] = useState(items[0].key)

    return (
        <>
            <div className='border-b border-neutral-200 sm:px-5'>
                {items.map(item => <button
                    type="button"
                    key={item.key}
                    onClick={() => setActiveTabKey(item.key)}
                    className={`text-2xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2 border-b-2 transition-all ${activetabKey === item.key ? "text-primary-700 border-primary-700" : "border-transparent text-neutral-600"}`}
                >
                    {item.label}
                </button>)}
            </div>

            <div>
                {items.map(item => <div key={item.key} className={`${activetabKey === item.key ? "block" : "hidden"}`}>
                    {item.children}
                </div>)}

            </div>
        </>
    )
}

export default Tabs;