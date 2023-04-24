import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import tw from "styled-components"
import BackImg from './assets/back.png'
import Link from 'next/link'


function UserPage() {
    const router = useRouter()
    const {userName, photoUrl, email, id} = router.query
    
  return (
    <>
    <ButtonContainer className='w-10 rounded-full absolute top-4 left-4 z-10  shadown-md cursor-pointer'>
        <Link href="/">
          <BackButton
          src={BackImg.src}/>
        </Link>
    </ButtonContainer>
    <div class="flex items-center justify-center">
  <div class="bg-white  mt-10 rounded-lg">
    <div class="flex items-center justify-center pt-10 flex-col">
      <img src={photoUrl} class="rounded-full w-32"/>
      <h1 class="text-gray-800 font-semibold text-xl mt-5">{userName}</h1>
      <h1 class="text-gray-500 text-sm">{email}</h1>
        <h1 class="text-gray-500 text-sm p-4 text-center">
         Rides Posted
        </h1>
    </div>
    
  </div>

</div>
    </>
  )
} 

const ButtonContainer = tw.div``
const BackButton = tw.img``

export default UserPage