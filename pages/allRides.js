import React, { useEffect, useState } from 'react'
import tw from "styled-components"
import carImg from './assets/UberX.webp'
import {  db, storage } from "../firebase"
import { getDocs, collection } from 'firebase/firestore'

function AllRides() {

    let books = []

    const [cars, setCars] = useState([])

    const colRef = collection(db, "users")

    useEffect(() => {
        getDocs(colRef).then((snapshot) => {
        
            snapshot.docs.forEach((car) => {
                
                
                setCars((prev) => {
                    return[...prev, car.data()]
                })
            })
            
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    console.log(cars)

  return (
    <Wrapper className='flex-1 overflow-y-scroll flex flex-col'>
        <Title className='text-gray-500 text-center text-xs py-2 border-b'>
            Choose a ride, or swipe up for more
        </Title>
        <CarList className='overflow-y-scroll'>
            <Car className='flex p-4 items-center '>
                <CarImage className='h-14 mr-2' src={carImg.src} />
                <CardDetails className='flex-1'>
                    <Service className='font-medium'>UberX</Service>
                    <Time className='text-xs text-blue-500'>5 min away</Time>
                </CardDetails>
                <Price className='text-sm'>
                    20$
                </Price>
            </Car>
            
        </CarList>
    </Wrapper>
  )
}

const Wrapper = tw.div``
const Title = tw.div``
const CarList = tw.div``
const Car = tw.div``
const CarImage = tw.img``
const CardDetails = tw.div``
const Service = tw.div``
const Price = tw.div``
const Time = tw.div``

export default AllRides