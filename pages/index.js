import tw from "styled-components"
import Map from "./components/map"
import UberLogoImg from './assets/Uber_logo_2018.png'
import UserImg from './assets/IMG-8016.jpg'
import carImg from './assets/UberX.webp'
import list from './assets/list.png'



export default function Home() {

 

  return (
    <Wrapper className="flex flex-col  h-screen">
      <Map></Map>
      <ActionItems className="flex-1 p-4">
        {/* header */}
        <Header className="flex justify-between items-center m-5 w-[100%]">
          <UberLogo className="h-12 " src={UberLogoImg.src} />
          <Profile className="flex items-center">
            <Name className="mr-4 w-20 text-sm">Pavlos Antoniou</Name>
              <UserImage className="h-16 w-16 rounded-full border-gray-200 p-px mr-2"
              src={UserImg.src}/>
          </Profile>

        </Header>
        <ActionButtons className="flex ">

          <ActionButton className="text-xl font-bold transition cursor-pointer transform hover:scale-105 rounded-lg justify-center flex-1 m-1 bg-gray-200 h-32  flex items-center flex-col">
            <ActionButtonImage className="h-3/5" src={carImg.src}/>
           Ride
          </ActionButton>

          <ActionButton className="text-xl font-bold transition cursor-pointer transform hover:scale-105 rounded-lg justify-center flex-1 m-1 bg-gray-200 h-32 flex items-center flex-col">
          <ActionButtonImage className="h-3/5" src={carImg.src}/>
            All  Rides
          </ActionButton>

          <ActionButton className="text-xl font-bold transition cursor-pointer transform hover:scale-105 rounded-lg justify-center flex-1 m-1 bg-gray-200 h-32 flex items-center flex-col">
          <ActionButtonImage className="h-3/5" src={carImg.src}/>
            Post a ride
          </ActionButton>

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