import { NextPage } from "next";
import { useEffect, useState } from "react";
import Gallery from "@/modules/domesticHotel/components/hotelDetails/Gallery";

type Props = {
    images?: []
}
const CipImages: NextPage<Props> = ({ images }) => {

    const [imagestate, setimagestate] = useState<[{}]>([{}])
    useEffect(() => {
        let list : [{}] = [{}]
        if (images?.length) {
            for (let i = 0; i < images.length; i++) {
                list.push({Image : images[i], Alt: '', Title:''})
            }
            setimagestate(list)
        }
    } ,[])
    

    return (
        <div>
            {
                images?.length && imagestate &&
                
                    <Gallery images={imagestate} />
                
            }
        </div>
    )
}

export default CipImages;
