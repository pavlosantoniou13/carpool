import tw from "styled-components"
import Map from "./components/map"
import UberLogoImg from './assets/Uber_logo_2018.png'
import UserImg from './assets/IMG-8016.jpg'



export default function Home() {

 

  return (
    <Wrapper className="flex flex-col  h-screen">
      <Map></Map>
      <ActionItems className="flex-1">
        {/* header */}
        <Header className="flex justify-between items-center">
          <UberLogo className="h-28 " src={UberLogoImg.src} />
          <Profile className="flex items-center">
            <Name className="mr-4 w-20 text-sm">Pavlos Antoniou</Name>
              <UserImage className="h-16 w-16 rounded-full border-gray-200 p-px"
              src={UserImg.src}/>
          </Profile>

        </Header>
        {/* ActionButtons */}

        {/* inputButton */}

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