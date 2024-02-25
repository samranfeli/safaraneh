import { NextPage } from "next";
import { useEffect, useState } from "react";
import CipGallery from "./CipGallery";


const CipImages: NextPage = () => {
    
    const a = [
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/ika/cip-ika-01.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/ika/cip-ika-02.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/thr/cip-thr-02.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/tbz.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/thr/cip-thr-04.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/ika/cip-ika-04.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/awh/cip-awh-02.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/thr/cip-thr-07.jpg',
            Alt: '',
            Title:''
       },
    ]
    

    return (
        <div>   
            <CipGallery images={a} />
        </div>
    )
}

export default CipImages;
