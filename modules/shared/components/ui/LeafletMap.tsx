import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {useEffect, useState} from 'react';

type Props = {
    className?: string;
    location: [number,number];
    zoom?: number;
}

const LeafletMap: React.FC<Props> = props => {

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
            <Marker position={props.location} />
        </MapContainer>
    )
};

export default LeafletMap;