import React, { useEffect, useState } from 'react'
import tw from "styled-components"
import UberLogoImg from './assets/Uber_logo_2018.png'
import { signInWithPopup, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth , provider} from '../firebase'
import { useRouter } from 'next/router'
import {  db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import Link from 'next/link'
const Login = () => {

    const router = useRouter()
    const [user, setUser] = useState()

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if(user){
          setUser(user)
          router.push('/')
          setDoc(doc(db, "users", user.uid),{
            id: user.uid,
            name: user.displayName,
            email: user.email,
            UserImage: user.photoURL
          })
        } else {
          return
        }
      })  
    },[])

    

  return (
    <Wrapper className=' p-4 flex flex-col bg-gray-100 h-screen'>
        <BlingoLogo className='h-12  w-auto object-contain self-start' src={UberLogoImg.src} />
        <Title className='text-5xl pt-4 text-gray-500 my-2'>Log in to access your account</Title>
        <HeadImage className='object-contain w-full ' src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_956,h_537/v1565734756/assets/fa/dc4e40-8aee-4a48-af4c-0475c1e01d26/original/singup_mobile.svg"/>
        <SignInButton onClick={() => signInWithPopup(auth, provider)} className= 'w-full  bg-black text-white text-center py-4 mt-8 self-center'>Sign in with Google</SignInButton>
        <div className='w-full  bg-black text-white text-center py-2 mt-4 self-center'>Dont have an account? <a className=' cursor-pointer hover:text-blue-500'  onClick={() => signInWithPopup(auth, provider)} >
        Register
        </a></div>
    </Wrapper>
  )
}

const Wrapper = tw.div``
const SignInButton = tw.button``
const BlingoLogo = tw.img``
const HeadImage = tw.img``
const Title = tw.div``

export default Login