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
        <Header className="flex">
          <UberLogo className="h-28 " src={UberLogoImg.src} />
          <Profile className="flex">
            <Name>Pavlos Antoniou</Name>
              <UserImage className="h-14"
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