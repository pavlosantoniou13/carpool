import React from 'react'
import tw from "styled-components"
import mapboxgl from "!mapbox-gl"
import { useEffect } from "react"

mapboxgl.accessToken = 'pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdheXVxbzIxNXNyM2xwaWJiNWkyNW01In0.gRmZXMcGc2BJ1w3tSDTunQ'

const Map = () => {

    useEffect(() => {
    const map = new mapboxgl.Map({
        container: 'map',
        center: [-99.29011, 39.39172],
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 9
        });
    },[])

  return (
    <Wrapper className='flex-1' id="map" ></Wrapper>
  )
}

const Wrapper = tw.div`
  
`
export default Map