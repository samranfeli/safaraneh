import { NextPage } from "next";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const M: NextPage = () => {
    return (
        <MapContainer center={[35.804149, 51.472863]} zoom={13} scrollWheelZoom={false} className="h-72 w-full mt-3 rounded-md">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

            <Marker position={[35.804149, 51.472863]} />

    </MapContainer>
    )
}

export default M;