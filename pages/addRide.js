import dynamic from "next/dynamic"


const AddRideComponent = dynamic(() => import("./components/addRideComponent"),{
  ssr: false
})


function addRide() {

  return (
    <AddRideComponent />
  )
}



export default addRide