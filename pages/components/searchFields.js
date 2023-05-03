import React, { useState } from 'react'
import BackImg from '../assets/back.png'
import CircleImg from '../assets/circle.png'
import line from '../assets/line.png'
import SquareImg from '../assets/black-square.png'
import AddImg from '../assets/add_FILL0_wght200_GRAD0_opsz48.png'
import tw from "styled-components"
import StarImg from '../assets/star.png'
import Link from 'next/link'
import { AddressAutofill } from '@mapbox/search-js-react'
import { fetchPlace } from '../../utils/fetchPlace';

function searchFields() {
    const accessToken = "pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg"

    const [pickup, setPickup] = useState("")
    const [dropoff, setDropoff] = useState("")

    
    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [autocompleteErr, setAutocompleteErr] = useState("");

    const handleCityChangePickup = async (e) => {
      if(e.target.value === "Athina"){
        setPickup("Athens");
      } else {
        setPickup(e.target.value);
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
        setDropoff("Athens");
      } else {
        setDropoff(e.target.value);
      }
      if (!dropoff) return;

      const res = await fetchPlace(dropoff);
      !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.text));
     res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
    };

  return (
    <Wrapper className="bg-gray-200 h-screen">
      <ButtonContainer className="bg-white px-4">
        <Link href="/">
          <BackButton className="h-12 cursor-pointer" src={BackImg.src} />
        </Link>
      </ButtonContainer>

      <InputContainer className=" mb-2 px-4  items-center  bg-white flex">
        <FromToIcons className="items-center   w-10 flex flex-col mr-2">
          <Circle className="h-2.5  " src={CircleImg.src} />
          <Line className="h-10" src={line.src} />
          <Square className="h-3" src={SquareImg.src} />
        </FromToIcons>
        <InputBoxes className="flex flex-col flex-1 ">
        <input
            className='outline-none border-none rounded-2 p-2 my-2 h-10 w-[100%] bg-gray-200'
            placeholder='Enter a pickup place'
            list="places"
            type="text"
            id="city"
            name="city"
            onChange={handleCityChangePickup}
            value={pickup}
            required
            pattern={autocompleteCities.join("|")}
            autoComplete="off"
          />
          <datalist id="places">
            {autocompleteCities.map((pickup, i) => (
              <option key={i}>{pickup}</option>
            ))}
          </datalist>
          <input
            className='outline-none border-none rounded-2 p-2 my-2 h-10 w-[100%] bg-gray-200'
            placeholder='Enter a pickup place'
            list="places"
            type="text"
            id="city"
            name="city"
            onChange={handleCityChangeDropoff}
            value={dropoff}
            required
            pattern={autocompleteCities.join("|")}
            autoComplete="off"
          />
          <datalist id="places">
            {autocompleteCities.map((dropoff, i) => (
              <option key={i}>{dropoff}</option>
            ))}
          </datalist>
        </InputBoxes>
        <PlusIcon
          className="ml-3  rounded-full  w-10 h-10 bg-gray-200"
          src={AddImg.src}
        />
      </InputContainer>
      <SavedPlaces className="flex items-center bg-white px-4 py-2 ">
          <StarIcon
            className="mr-2 rounded-full bg-gray-400 w-10 h-10 p-2"
            src={StarImg.src}
          />
          Saved Places
        </SavedPlaces>
      <Link
        href={{
          pathname: "/confirm",
          query: {
            pickup: pickup.toLowerCase(),
            dropoff: dropoff.toLowerCase(),
          },
        }}
      >
        
        <ConfirmButtonContainer className="bg-black text-white text-center mt-2 mx-4 px-4 py-3 text-2xl cursor-pointer">
          Confirm Locations
        </ConfirmButtonContainer>
      </Link>
    </Wrapper>
  );
}

const Wrapper = tw.div``
const ButtonContainer = tw.div``
const BackButton = tw.img``
const InputContainer = tw.div``
const FromToIcons = tw.div``
const Circle = tw.img``
const Line = tw.img``
const Square = tw.img``
const InputBoxes = tw.div``
const Input = tw.input``
const PlusIcon = tw.img``
const StarIcon = tw.img``
const SavedPlaces = tw.div``
const ConfirmButtonContainer = tw.div``

export default searchFields