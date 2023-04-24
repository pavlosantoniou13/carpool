import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import tw from "styled-components"
import BackImg from './assets/back.png'
import Link from 'next/link'
import {  db, storage } from "@/firebase"
import { getDocs, collection,  doc, setDoc, addDoc  } from 'firebase/firestore'
import carImg from './assets/UberX.webp'



function RideOwnerPage() {
    const router = useRouter()
    const {userName, photoUrl, email, id} = router.query

    const [data, setData] = useState([]);
    const colRef = collection(db, "available_Rides");
    const [ride, setRide] = useState([]);

    useEffect(() => {
      getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setData((prev) => {
              return [...prev, doc.data()];
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    useEffect(() => {
      data.forEach((data) => {
        if (data.userEmail === email) {
          setRide((prev) => {
            return [...prev, data];
          });
        }
      });
    }, [data]);
   
    

  return (
    <>
      <ButtonContainer className="w-10 rounded-full absolute top-4 left-4 z-10  shadown-md cursor-pointer">
        <Link href="/">
          <BackButton src={BackImg.src} />
        </Link>
      </ButtonContainer>
      <div class="flex items-center justify-center">
        <div class="bg-white  mt-10 rounded-lg">
          <div class="flex items-center justify-center pt-10 flex-col">
            <img src={photoUrl} class="rounded-full w-32" />
            <h1 class="text-gray-800 font-semibold text-xl mt-5">{userName}</h1>
            <h1 class="text-gray-500 text-sm">{email}</h1>
            <h1 class="text-gray-500 text-sm p-4 text-center">Rides Posted</h1>
          </div>
        </div>
      </div>
      <CarList className="overflow-y-scroll">
        {ride.map((data) => (
          <Car className="flex p-4 items-center cursor-pointer">
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
    </>
  );
}

const ButtonContainer = tw.div``
const BackButton = tw.img``
const Wrapper = tw.div``
const Title = tw.div``
const CarList = tw.div``
const Car = tw.div``
const CarImage = tw.img``
const CardDetails = tw.div``
const Service = tw.div``
const Price = tw.div``
const Time = tw.div``
const Destination = tw.div``
export default RideOwnerPage