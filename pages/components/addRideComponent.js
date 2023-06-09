import {  db } from "../../firebase"
import { doc, setDoc  } from 'firebase/firestore'
import React, { use, useEffect, useState } from 'react'
import BackImg from '../assets/back.png'
import tw from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from 'react-toastify';
import Axios from "axios"
import { fetchPlace } from "@/utils/fetchPlace"
import { v4 as randomId } from "uuid"

function placeSuggest() {
    const accessToken = "pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg"


    const router = useRouter()
    const {userName, photoUrl, email, id} = router.query

    const [name, setName] = useState("")
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [carBrand, setCarBrand] = useState("")
    const [fuelType, setFuelType] = useState("")
    const [price, setPrice] = useState("")
    const [pickUpCoordinates, setPickupCoordinates] = useState("")
    const [dropffCoordinates, setdropffCoordinatesCoordinates] = useState("")
    const [pickup, setPickup] = useState()
    const [dropoff, setdropff] = useState()
    const [milage, setMilage] = useState()
    const [distance, setDistance] = useState()
    const [gasPriceData, setGasPriceData] = useState()
    const [passengers, setPassengers] = useState()

    
    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [autocompleteErr, setAutocompleteErr] = useState("");


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
  
      
  
    };
  
  
    // gets distance betwwen spaces
    useEffect(() => {
      if(pickUpCoordinates !== "" && dropffCoordinates !== ""){ 
        Axios.get(`https://route.mapscdn.com/route/v1/driving/${pickUpCoordinates.lon},${pickUpCoordinates.lat};${dropffCoordinates.lon},${dropffCoordinates.lat}?overview=false&alternatives=true&steps=true&hints=;`)
      .then(data => calculateDistance(data))
      } else {
        return
      }
    },[pickUpCoordinates, dropffCoordinates])
  
  
    //manipulates distance data
    const calculateDistance = (data) => {
      
      const rawDistance = data.data.routes[0].distance.toString()
      const distance = rawDistance.substring(0, 3)
      
      // calculate gas price
     const gasPrice = distance / milage * 2

     setPrice(Math.round(gasPrice))
      
     
      
    }

    useEffect(() => {
      if(price !== "") {
        postData()
      } else {
        return
      }
    },[price])
    
  
   
    
    
    const handleCityChangePickup = async (e) => {
      if(e.target.value === "Athina"){
        setPickup("Athens");
        setOrigin("Athens");
      } else {
        setPickup(e.target.value);
        setOrigin(e.target.value);
      }
      if (!pickup) return;

      const res = await fetchPlace(pickup);
      !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.text));
     res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
    };

    const handleCityChangeDropoff = async (e) => {
      if(e.target.value === "Athina"){
        setdropff("Athens");
        setDestination("Athens")
      } else {
        setdropff(e.target.value);
        setDestination(e.target.value)
      }
      if (!dropoff) return;

      const res = await fetchPlace(dropoff);
      !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.text));
     res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
    };
  
    //post data
    const postData = async (e) => {
      if(name !== "" && origin !== "" && destination !== "" && carBrand !== "" && fuelType !== "" && price !== "" && milage !== ""  ){
        const RandomId = randomId().toString()
        await setDoc(doc(db, "available_Rides", RandomId),{
          name: name.toString().toLowerCase(),
          origin: origin.toString().toLowerCase(),
          destination: destination.toString().toLowerCase(),
          carBrand: carBrand.toString().toLowerCase(),
          fuelType: fuelType.toString().toLowerCase(),
          passengers: passengers.toString().toLowerCase(),
          price: price.toString() + "€",
          userId: id,
          user: userName,
          userEmail: email,
          userImage: photoUrl,
          id: RandomId,
          consumption: milage
          

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
        setDistance("");
        setMilage("");
        setPassengers("")
        
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
        <ButtonContainer className="w-10 rounded-full absolute  left-4 z-10  shadown-md cursor-pointer">
          <Link href="/">
            <BackButton src={BackImg.src} />
          </Link>
        </ButtonContainer>
        <form onSubmit={intializeData} className=" p-10 w-[100%]">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=' '
              list="places"
              type="text"
              id="city"
              name="city"
              onChange={handleCityChangePickup}
              value={origin}
              required
              pattern={autocompleteCities.join("|")}
              autoComplete="off"
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Going From
            </label>
            <datalist id="places">
              {autocompleteCities.map((dropoff, i) => (
                <option key={i}>{dropoff}</option>
              ))}
            </datalist>
          </div>
          <div className="relative z-0 w-full mb-6 group">
          <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=' '
              list="places"
              type="text"
              id="city"
              name="city"
              onChange={handleCityChangeDropoff}
              value={destination}
              required
              pattern={autocompleteCities.join("|")}
              autoComplete="off"
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Going To
            </label>
            <datalist id="places">
              {autocompleteCities.map((pickup, i) => (
                <option key={i}>{pickup}</option>
              ))}
            </datalist>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => setCarBrand(e.target.value)}
              value={carBrand}
              type="text"
              name="carBrand"
              id="carBrand"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="carBrand"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Car brand
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => setPassengers(e.target.value)}
              value={passengers}
              type="text"
              name="passengers"
              id="passengers"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fuelType"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
             Passengers
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => setFuelType(e.target.value)}
              value={fuelType}
              type="text"
              name="fuelType"
              id="fuelType"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fuelType"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fuel type
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => setMilage(e.target.value)}
              value={milage}
              type="text"
              name="milage"
              id="milage"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fuelType"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Consumption{" "}
            </label>
            <div className="text-sm py-2">
              Don't know the Consumption of your car?
              <a
                className="hover:text-blue-500"
                href="https://www.google.com/search?q=%7Binsert+your+car+model+and+year+of+make%7D+liter+per+killiomeres&sxsrf=APwXEddq-yEV3hX8wNbJMKWVUvZk9VwGbQ%3A1681926523713&ei=eylAZNCQK92Nxc8PvoC3qAQ&ved=0ahUKEwiQuu_HwLb-AhXdRvEDHT7ADUUQ4dUDCA8&uact=5&oq=%7Binsert+your+car+model+and+year+of+make%7D+liter+per+killiomeres&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAFAAWABgAGgAcAB4AIABAIgBAJIBAJgBAKABAQ&sclient=gws-wiz-serp"
              >
                Find out here
              </a>
            </div>
          </div>
          <button
            onClick={intializeData}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </>
    );
}
const ButtonContainer = tw.div``
const BackButton = tw.img``
export default placeSuggest