import { NextPage } from "next";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getPortal } from "../shared/actions/portalActions";

const MapContact: NextPage = () => {

    const [MapZone, setMapZone] : any = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            const data = await getPortal()
            setMapZone([+data.data.Phrases.find((item: any) => item.Keyword == 'Latitude').Value,
                +data.data.Phrases.find((item: any) => item.Keyword == "Longitude").Value,
                +data.data.Phrases.find((item: any) => item.Keyword == "MapZoom").Value
            ])
            
        }
        getData()
    }, [])
    return (
    <>
        {
            MapZone.length &&
                <MapContainer
                    center={[MapZone[0], MapZone[1]]}
                    zoom={MapZone[2]} scrollWheelZoom={false} className="h-72 w-full mt-3 rounded-md">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[35.804149, 51.472863]} />
                </MapContainer>
        }
    </>        
    )
    
}

export default MapContact;