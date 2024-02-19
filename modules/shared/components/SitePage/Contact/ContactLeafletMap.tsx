import { NextPage } from "next";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getPortal } from "../../../actions/portalActions";
import MapIcon from '../../public/images/organizational-reservation/marker-icon-2x.png';
import Skeleton from "../../ui/Skeleton";

const MapContact: NextPage = () => {

    const [MapZone, setMapZone] : any = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            const data = await getPortal()
            setMapZone([+data.data?.Phrases?.find((item: any) => item.Keyword == 'Latitude')?.Value,
                +data.data?.Phrases?.find((item: any) => item.Keyword == "Longitude")?.Value,
                +data.data?.Phrases?.find((item: any) => item.Keyword == "MapZoom")?.Value
            ])

        }
        getData()
    }, [])

    var greenIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    
        iconSize:     [25, 40], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
  
    });
    
    return (
    <>
        {
            MapZone.length ?
                <MapContainer
                        center={[MapZone[0] || 20, MapZone[1] || 10]}
                        zoom={MapZone[2]}
                        scrollWheelZoom={true}
                        className="h-72 w-full mt-3 rounded-md">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                        position={[35.804149, 51.472863]}
                        icon={greenIcon}
                    />
            </MapContainer> 
            :
            <div></div>              
        }
    </>        
    )
    
}

export default MapContact;