import React, { useEffect, useState } from 'react'
import Map from './components/map'
import tw from "styled-components"
import { useRouter } from 'next/router'
import RideSelector from './components/RideSelector'
import Link from 'next/link'
import BackImg from './assets/back.png'

function Confirm() {
  //add autocorrect on the input field
    const router = useRouter()
    const { pickup, dropoff } = router.query

    const [pickUpCoordinates, setPickupCoordinates] = useState()
    const [dropffCoordinates, setdropffCoordinatesCoordinates] = useState()

    
    const getPickupCoordinates = async() => {
        const api = "1977debf2877a0be6ba449dd01ada2ce"
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${pickup}&appid=${api}` 
        )
        .then(response => response.json())
        .then(data => {
            setPickupCoordinates(data.coord)
           
        })
    }

    const getDropoffCoordinates = async() => {
        const api = "1977debf2877a0be6ba449dd01ada2ce"
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${dropoff}&appid=${api}` 
        )
        .then(response => response.json())
        .then(data => {
            setdropffCoordinatesCoordinates(data.coord)
           
        })
    }

    useEffect(() => {
        if(pickup === "" & dropoff === ""){
            return
        } else {
            getPickupCoordinates()
            getDropoffCoordinates()
        }
       
    }, [pickup, dropoff])

  return (
    <Wrapper className="flex h-screen flex-col">
        <ButtonContainer className='w-10 rounded-full absolute top-4 left-4 z-10 bg-white shadown-md cursor-pointer'>
            <Link href="/search">
            <BackButton src={BackImg.src}/>
            </Link>
        </ButtonContainer>
      <Map
        pickUpCoordinates={pickUpCoordinates}
        dropffCoordinates={dropffCoordinates}
      />
      <RideContainer className="flex-1 flex flex-col h-1/2">
        <RideSelector
          pickup={pickup}
          dropoff={dropoff}
        />
        <ConfirmButtonContainer className="border-t-2">
          <ConfirmButton className="bg-black text-white my-4 mx-4 py-4 text-center text-xl">
            Confirm uberx
          </ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div``
const RideContainer = tw.div``
const ConfirmButton = tw.div``
const ConfirmButtonContainer = tw.div``
const ButtonContainer = tw.div``
const BackButton = tw.img``


export default Confirm