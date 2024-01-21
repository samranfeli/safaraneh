import { NextPage } from "next";
import Carousel from 'react-multi-carousel';
import Image from "next/image";
import { CityItemType } from "../../types/blog";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

//carousel responsive
const responsive = {
    desktop: {
        breakpoint: { max: 5000, min: 992 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 992, min: 460 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1
    }
};

interface Props {
    data? : CityItemType[]
}


const BlogCities: NextPage<Props> = ({data}) => {
    
    
    return (
        <div className="text-black">
            <div className="text-center pt-14 p-5 max-md:pt-10">
                <h1 className="font-bold text-4xl p-5">وبلاگ</h1>
                <p className="max-sm:text-sm max-sm:text-gray-600">حرفه ای ترین شبکه معرفی هتل های ایران</p>
            </div>

            <div className='pl-5 pr-5  max-sm:p-1 m-auto max-w-screen-xl'>

            <Carousel
                className='home-carousel'
                rtl
                responsive={responsive}
                renderDotsOutside
                showDots
            >
            {
                data ?
                data.map((city ,index) => 
                    <Link href={city.excerpt.rendered.slice(3, city.excerpt.rendered.length - 5)}
                    target="_blank" className="max-sm:relative max-sm:top-9" key={city.title.rendered}>
                        <div className="p-2">
                            <Image src={city.images.medium} alt="pic" width={397} height={266} className="object-fit rounded-md w-full" priority={!index} />
                            <p className="bg-white p-4 text-center rounded-lg relative bottom-18 ml-3 mr-3 m-auto text-xl">{city.title.rendered}</p> 
                        </div>
                    </Link>
                ):<p></p>

            }
            </Carousel>

            </div>
        </div>
    )
}

export default BlogCities;