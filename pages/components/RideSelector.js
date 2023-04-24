import React, { useEffect, useState } from 'react'
import tw from "styled-components"
import carImg from '../assets/UberX.webp'
import {  db, storage } from "@/firebase"
import { getDocs, collection,  doc, setDoc, addDoc  } from 'firebase/firestore'
import {  useRouter } from 'next/router'

const RideSelector = ({ pickup, dropoff }) => {
  const [data, setData] = useState([]);
  const colRef = collection(db, "available_Rides");
  const userColRef = collection(db, "users")
  const [ride, setRide] = useState([]);

  const [usersData, setUsersData] = useState([])
  const [user, setUser] = useState("")
  const [userName, setUserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const [userId, setUserId] = useState(null)

  const router = useRouter()

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
      if (data.destination === dropoff && data.origin === pickup) {
        setRide((prev) => {
          return [...prev, data];
        });
      }
    });
  }, [data]);

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
      <Title className="text-gray-500 text-center text-xs py-2 border-b">
        Choose a ride, or swipe up for more
      </Title>
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
};

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



export default RideSelector