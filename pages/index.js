import tw from "styled-components"
import mapboxgl from "!mapbox-gl"
import { useEffect } from "react"

mapboxgl.accessToken = 'pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdheXVxbzIxNXNyM2xwaWJiNWkyNW01In0.gRmZXMcGc2BJ1w3tSDTunQ'

export default function Home() {

 useEffect(() => {
  const map = new mapboxgl.Map({
    container: 'map',
    center: [-99.29011, 39.39172],
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9
    });
 },[])
  


  return (
    <Wrapper className="flex flex-col bg-red-300 h-screen">
      <Map id="map" className="bg-red-500 flex-1"></Map>
      <ActionItems className="flex-1">Start</ActionItems>
    </Wrapper>
  )
}


const Wrapper = tw.div`
  
`

const Map = tw.div`

`

const ActionItems = tw.div`

`