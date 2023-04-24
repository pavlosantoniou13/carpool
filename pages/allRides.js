import React, { useEffect, useState } from 'react'
import tw from "styled-components"
import carImg from './assets/UberX.webp'
import BackImg from './assets/back.png'
import {  db, storage } from "../firebase"
import { getDocs, collection,  doc, setDoc, addDoc  } from 'firebase/firestore'
import Link from 'next/link'
import {  useRouter } from 'next/router'

function AllRides() {
    const [data, setData] = useState([])
    const [usersData, setUsersData] = useState([])
    const [user, setUser] = useState("")

    const router = useRouter()

    const colRef = collection(db, "available_Rides")
    const userColRef = collection(db, "users")

    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPhoto, setUserPhoto] = useState(null)
    const [userId, setUserId] = useState(null)

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
      getDocs(userColRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setUsersData((prev) => {
              return [...prev, doc.data()];
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const fetchUser = (e) => {

      usersData.forEach((data) => {
        if(data.email === e.target.id) {
          setUser(data)
          setUserName(data.name)
          setUserEmail(data.email)
          setUserId(data.id)
          setUserPhoto(data.UserImage)
        } else {
          return
        }
      })
    }

    useEffect(() => {
      if(userName !== null){
        router.push({
          pathname: "rideOwnerPage",
          query: {
            userName: userName,
            photoUrl: userPhoto,
            email: userEmail,
            id: userId
          }
        })
      } else {
        return
      }
    }, [userEmail])

    

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
          <Car className="flex p-4 items-center" > 
            <CarImage className="h-14 mr-2" src={carImg.src} />
            <CardDetails className="flex-1">
              <Service className="font-medium">{data.name}</Service>
              <Destination className="text-xs text-blue-500">
                {data.origin + "-" + data.destination}
              </Destination>
            </CardDetails>
            <div className='flex flex-col text-center cursor-pointer'>
              <Price className="text-sm">{data.price}</Price>
              <div id={data.userEmail}
              onClick={fetchUser}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book </div>
            </div>
            
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