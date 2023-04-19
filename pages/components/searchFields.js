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


function searchFields() {
    const accessToken = "pk.eyJ1IjoicGF2bG9zYW50b25pb3UxMyIsImEiOiJjbGdkeHV5OXIwOWgxM3JwN2V6cDh2eWVzIn0.1o8ix2i0YO2BXk3ErHn9Gg"

    const [pickup, setPickup] = useState("")
    const [dropoff, setDropoff] = useState("")

    

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
          <AddressAutofill
            options={{
              language: "en",
              country: "gr",
            }}
            accessToken={accessToken}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="outline-none border-none rounded-2 p-2 my-2 h-10 w-[100%] bg-gray-200"
                placeholder="Enter pickup place"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </form>
          </AddressAutofill>
          <AddressAutofill
            options={{
              language: "en",
              country: "gr",
            }}
            accessToken={accessToken}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="outline-none border-none rounded-2 w-[100%] p-2 my-2 h-10 bg-gray-200"
                placeholder="Where to?"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </form>
          </AddressAutofill>
        </InputBoxes>
        <PlusIcon
          className="ml-3  rounded-full  w-10 h-10 bg-gray-200"
          src={AddImg.src}
        />
      </InputContainer>
      <Link
        href={{
          pathname: "/confirm",
          query: {
            pickup: pickup,
            dropoff: dropoff,
          },
        }}
      >
        <SavedPlaces className="flex items-center bg-white px-4 py-2 ">
          <StarIcon
            className="mr-2 rounded-full bg-gray-400 w-10 h-10 p-2"
            src={StarImg.src}
          />
          Saved Places
        </SavedPlaces>
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