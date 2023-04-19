import dynamic from "next/dynamic"


const PlaceSuggest = dynamic(() => import("./components/placeSuggest"),{
  ssr: false
})


function addRide() {

  return (
    <PlaceSuggest />
  )
}



export default addRide