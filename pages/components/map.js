import React from 'react'
import tw from "styled-components"
import mapboxgl from "!mapbox-gl"
import { useEffect } from "react"

mapboxgl.accessToken = 'pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg'

const Map = (props) => {

console.log(props.pickUpCoordinates)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      center: [23.727539, 37.98381],
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 9,
    });

    if(props.pickUpCoordinates){
      addToMap(map, props.pickUpCoordinates)
    }

    if(props.dropffCoordinates){
      addToMap(map, props.dropffCoordinates)
    }

    if(props.pickUpCoordinates && props.dropffCoordinates) {
      map.fitBounds([
        props.pickUpCoordinates,
        props.dropffCoordinates
      ], {
        padding: 60
      })
    }

  },[props.pickUpCoordinates, props.dropffCoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
    .setLngLat([coordinates.lon, coordinates.lat])
    .addTo(map);
  }

 

  return <Wrapper className="flex-1 h-1/2" id="map"></Wrapper>;
}

const Wrapper = tw.div`
  
`
export default Map