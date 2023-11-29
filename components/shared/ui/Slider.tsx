import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
    className?:string;
    rtl?:boolean;
    navigation?:boolean;
    pagination?:any;
    slidesPerView?: number;
    spaceBetween?: number;
    items:React.ReactNode[];
    responsive?: {[width: number]: SwiperOptions; [ratio: string]: SwiperOptions;}
}

const Slider: React.FC<Props> = props => {

    return (
        <div>           
            
            <Swiper
                className={props.className} 
                dir="rtl"
                navigation={props.navigation}
                pagination={props.pagination}
                slidesPerView={props.slidesPerView || 1}
                spaceBetween={props.spaceBetween || 0}
                modules={[Navigation,Pagination]}
                breakpoints={props.responsive}                
            >
                {props.items.map((item,index) => (
                     <SwiperSlide key={index}>
                        {item}
                     </SwiperSlide>
                ))}

            </Swiper>

        </div>


    )
}

export default Slider;