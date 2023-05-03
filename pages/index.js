import tw from "styled-components"
import Map from "./components/map"
import UberLogoImg from './assets/Uber_logo_2018.png'
import UserImg from './assets/IMG-8016.jpg'
import carImg from './assets/UberX.webp'
import home from './assets/home.png'
import list from './assets/list.png'
import Link from "next/link"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FormImage from './assets/formImage.png'



export default function Home() {

 const [user, setUser] = useState(null)
 const [userName, setUserName] = useState(null)
 const [userEmail, setUserEmail] = useState(null)
 const [userPhoto, setUserPhoto] = useState(null)
 const [userId, setUserId] = useState(null)

 const router = useRouter()

 useEffect(() => {
  return onAuthStateChanged(auth, user => {
    if(user) {
      setUser({
        userName: user.displayName,
        photoUrl: user.photoURL,
        email: user.email
      })
      setUserName(user.displayName)
      setUserEmail(user.email)
      setUserPhoto(user.photoURL)
      setUserId(user.uid)
    } else {
      setUser(null)
      router.push('/login')
    }
  })
 }, [])
 
  return (
    <Wrapper className="flex flex-col  h-screen ">
      <ButtonContainer className='w-10 rounded-full absolute top-4 left-4 z-10  shadown-md cursor-pointer'>
        <Link href="/login">
          <BackButton
          onClick={() => {signOut(auth)}}
          src={home.src}/>
        </Link>
      </ButtonContainer>
      <Map></Map>
      <ActionItems className="flex-1 p-4">
        {/* header */}
        <Header className="flex justify-between items-center  w-[100%]">
          <UberLogo className="h-14 my-4" src={"https://uspto.report/TM/85250264/mark"}/>
          <Profile className="flex items-center">
            <Name className="font-bold mr-4 w-20 text-l">{user && user.userName}</Name>
              <Link href={{
                pathname: "/userPage",
                query: {
                  userName: userName,
                  photoUrl: userPhoto,
                  email: userEmail,
                  id: userId
                }
              }}>
              <UserImage className="h-14 w-14 rounded-full border-gray-200 p-px mr-2"
              src={user && user.photoUrl}/>
              </Link>
              
          </Profile>

        </Header>
        <ActionButtons className="flex ">
          
          <Link href="/search" className="text-xl font-bold transition cursor-pointer transform hover:scale-105 rounded-lg justify-center flex-1 m-1 bg-gray-200 h-32  flex items-center flex-col">
            <ActionButtonImage className="h-3/5" src={carImg.src}/>
           Ride
          </Link>

          <Link href={{
                pathname: "/allRides",
                query: {
                  CurrentUser: userName,
                  CurrentUserPhotoUrl: userPhoto,
                  CurrentUserEmail: userEmail,
                  CurrentUserId: userId
                }
              }} className="text-xl font-bold transition cursor-pointer transform hover:scale-105 rounded-lg justify-center flex-1 m-1 bg-gray-200 h-32 flex items-center flex-col">
          <ActionButtonImage className="h-3/5" src={carImg.src}/>
            All  Rides
          </Link>

          <Link href={{
                pathname: "/addRide",
                query: {
                  userName: userName,
                  photoUrl: userPhoto,
                  email: userEmail,
                  id: userId
                }
              }} className="text-xl font-bold transition cursor-pointer transform hover:scale-105 rounded-lg justify-center flex-1 m-1 bg-gray-200 h-32 flex items-center flex-col">
          <ActionButtonImage className="h-3/5" src={carImg.src}/>
            Post a ride
          </Link>

        </ActionButtons>
           
        <InputButton className="mt-8 flex items-center font-bold p-4 text-2xl h-20 bg-gray-200">
          Where to?
        </InputButton>

      </ActionItems>
    </Wrapper>
  )
}


const Wrapper = tw.div``
const ActionItems = tw.div``
const Header = tw.div``
const UberLogo = tw.img``
const Profile = tw.div``
const Name = tw.div``
const UserImage = tw.img``
const ActionButtons = tw.div``
const ActionButton = tw.div``
const ActionButtonImage = tw.img``
const InputButton = tw.div``
const ButtonContainer = tw.div``
const BackButton = tw.img``
