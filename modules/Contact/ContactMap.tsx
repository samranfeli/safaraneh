import dynamic from "next/dynamic";

const Map = dynamic(() => import('./ContactLeafletMap'), {
    ssr:false
})

export default Map