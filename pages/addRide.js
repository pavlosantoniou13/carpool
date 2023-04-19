import {  db, storage } from "../firebase"
import { getDocs, collection,  doc, setDoc, addDoc  } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import BackImg from './assets/back.png'
import tw from "styled-components"
import Link from "next/link"
import { toast } from 'react-toastify';
import { AddressAutofill } from '@mapbox/search-js-react'
import Axios from "axios"
import DistanceCalculator from 'distance-calculator-js';

function addRide() {

  const accessToken = "pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg"


  const [name, setName] = useState("")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [carBrand, setCarBrand] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [price, setPrice] = useState("")
  const [pickUpCoordinates, setPickupCoordinates] = useState()
  const [dropffCoordinates, setdropffCoordinatesCoordinates] = useState()
  const [pickup, setPickup] = useState()
  const [dropoff, setdropff] = useState()

  //initializes the data for proccessing
  const intializeData = (e) => {
    e.preventDefault()
    getCoordinates()
    
  }

  //get coords 
  const getCoordinates = () => {
    const api = "1977debf2877a0be6ba449dd01ada2ce";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${pickup}&appid=${api}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.coord);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${dropoff}&appid=${api}`
    )
      .then((response) => response.json())
      .then((data) => {
        setdropffCoordinatesCoordinates(data.coord);
      });

    getDistance()

  };

  //distance calculator
  const getDistance = () => {
    /**
     * const pickup = { lat: pickUpCoordinates.lat, long: pickUpCoordinates.lon };
    const dropoff = { lat: dropffCoordinates.lat, long: dropffCoordinates.lon };
    const distance = DistanceCalculator.calculate(pickup, dropoff, 'km');
    console.log(distance)
     */

    Axios.get(`https://route.mapscdn.com/route/v1/driving/${pickUpCoordinates.lon},${pickUpCoordinates.lat};${dropffCoordinates.lon},${dropffCoordinates.lat}?overview=false&alternatives=true&steps=true&hints=;`)
    .then(res => console.log(res))
    
    
    //postData()
  }

  //calculates gas price 
  const calculateGasPrice = () => {
    const consumption = 7

  }

  //post data
  const postData = async (e) => {
    if(name !== "" && origin !== "" && destination !== "" && carBrand !== "" && fuelType !== ""  ){
      await addDoc(collection(db, "available_Rides"),{
        name: name.toString(),
        origin: origin.toString(),
        destination: destination.toString(),
        carBrand: carBrand.toString(),
        fuelType: fuelType.toString()
      })  

      toast.success("You posted your ride succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setName("");
      setOrigin("");
      setDestination("");
      setCarBrand("");
      setFuelType("");
      setPrice("");
      
    } else {
      toast.error("Please make sure all of the inputs are full", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
    <ButtonContainer className='w-10 rounded-full absolute  left-4 z-10  shadown-md cursor-pointer'>
      <Link href="/">
       <BackButton src={BackImg.src}/>
      </Link>
    </ButtonContainer>
      <form onSubmit={intializeData}  className=" p-10 w-[100%]">
    <div className="relative z-0 w-full mb-6 group">
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your name</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <AddressAutofill accessToken={accessToken}>
        <input onChange={(e) => {setOrigin(e.target.value); setPickup(e.target.value)}} value={origin} type="text" name="origin" id="origin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="origin" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Going from</label>
      </AddressAutofill>  
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <AddressAutofill accessToken={accessToken}>
        <input onChange={(e) => {setDestination(e.target.value); setdropff(e.target.value)}} value={destination} type="text" name="destination" id="destination" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="destination" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Going to </label>
      </AddressAutofill>  
    </div>
    <div className="relative z-0 w-full mb-6 group">
        <input onChange={(e) => setCarBrand(e.target.value)} value={carBrand} type="text" name="carBrand" id="carBrand" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="carBrand" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Car brand </label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
        <input onChange={(e) => setFuelType(e.target.value)} value={fuelType} type="text" name="fuelType" id="fuelType" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="fuelType" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fuel type </label>
    </div>
    <button onClick={intializeData} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    <button onClick={getDistance}>get distance</button>
    </>
    
  );
}

const ButtonContainer = tw.div``
const BackButton = tw.img``

export default addRide