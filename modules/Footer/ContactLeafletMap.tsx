import { NextPage } from "next";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Home } from "../shared/components/ui/icons";

const M: NextPage = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="h-72 w-full mt-3 rounded-md">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

            <Marker position={[51.505, -0.09]} />

    </MapContainer>
    )
}

export default M;