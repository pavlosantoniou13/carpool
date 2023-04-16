import React, { useEffect, useState } from 'react'
import tw from "styled-components"
import carImg from './assets/UberX.webp'
import BackImg from './assets/back.png'
import {  db, storage } from "../firebase"
import { getDocs, collection,  doc, setDoc, addDoc  } from 'firebase/firestore'
import Link from 'next/link'

function AllRides() {
    const [data, setData] = useState([])
    const colRef = collection(db, "available_Rides")

    useEffect(() => {
        getDocs(colRef).then((snapshot) => {
        
            snapshot.docs.forEach((doc) => {
                setData((prev) => {
                    return[...prev, doc.data()]
                })
            })
            
            
        })
        .catch(err => {
            console.log(err)
        })

    }, [])


    //post data
    const postData = async () => {
        await addDoc(collection(db, "available_Rides"),{
            name:"pavlos",
            destination: "salouga"
        })
    }

    console.log(data)

  return (
    <Wrapper className="flex-1 overflow-y-scroll flex flex-col">
        <ButtonContainer className='w-10 rounded-full absolute  left-4 z-10  shadown-md cursor-pointer'>
            <Link href="/">
            <BackButton src={BackImg.src}/>
            </Link>
        </ButtonContainer>
      <Title className="text-gray-500 text-center text-xs py-2 border-b">
        Choose a ride, or swipe up for more
      </Title>
      <CarList className="overflow-y-scroll">
        {data.map((data) => (
          <Car className="flex p-4 items-center ">
            <CarImage className="h-14 mr-2" src={carImg.src} />
            <CardDetails className="flex-1">
              <Service className="font-medium">{data.name}</Service>
              <Destination className="text-xs text-blue-500">
                {data.origin + "-" + data.destination}
              </Destination>
            </CardDetails>
            <Price className="text-sm">{data.price}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
}

const Wrapper = tw.div``
const Title = tw.div``
const CarList = tw.div``
const Car = tw.div``
const CarImage = tw.img``
const CardDetails = tw.div``
const Service = tw.div``
const Price = tw.div``
const Destination = tw.div``
const ButtonContainer = tw.div``
const BackButton = tw.img``


export default AllRides