import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useTranslation } from "next-i18next";
import {useEffect, useState} from 'react';

type Props = {
    className?: string;
    location: [number,number];
    zoom?: number;
}

const LeafletMap: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const {} = props;

    const [isMounted,setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);


    if(!isMounted){
        return "";
    }

    return (
        <MapContainer className={props.className} center={props.location} zoom={props.zoom || 14} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
        </MapContainer>
    )
};

export default LeafletMap;