import React from 'react'
import BackImg from './assets/back.png'
import CircleImg from './assets/circle.png'
import line from './assets/line.png'
import SquareImg from './assets/black-square.png'
import AddImg from './assets/add_FILL0_wght200_GRAD0_opsz48.png'
import tw from "styled-components"
import StarImg from './assets/star.png'
import Link from 'next/link'


function Search() {
  return (
    <Wrapper className='bg-gray-200 h-screen'>
       
        <ButtonContainer className='bg-white px-4'>
            <Link href="/">
                <BackButton className='h-12' src={BackImg.src}/>
            </Link>
        </ButtonContainer>

       <InputContainer className=' mb-2 px-4  items-center  bg-white flex'>
            <FromToIcons className='items-center   w-10 flex flex-col mr-2'>
                <Circle className='h-2.5  ' src={CircleImg.src}/>
                <Line className='h-10' src={line.src} />
                <Square className='h-3' src={SquareImg.src} />
            </FromToIcons>
            <InputBoxes className='flex flex-col flex-1 '>
                <Input className='outline-none border-none rounded-2 p-2 my-2 h-10 bg-gray-200' placeholder='Enter pickup place' />
                <Input className='outline-none border-none rounded-2 p-2 my-2 h-10 bg-gray-200' placeholder='Enter pickup place' />
            </InputBoxes>
            <PlusIcon className='ml-3  rounded-full  w-10 h-10 bg-gray-200' src={AddImg.src} />
       </InputContainer>
       <SavedPlaces className='flex items-center bg-white px-4 py-2 '>
           <StarIcon className='mr-2 rounded-full bg-gray-400 w-10 h-10 p-2' src={StarImg.src} /> 
           Saved Places
       </SavedPlaces>
       {/* condfirm contianer */}
    </Wrapper>
  )
}

const Wrapper = tw.div``
const ButtonContainer = tw.div``
const BackButton = tw.img``
const InputContainer = tw.div``
const FromToIcons = tw.div``
const Circle = tw.img``
const Line = tw.img``
const Square = tw.img``
const InputBoxes = tw.div``
const Input = tw.input``
const PlusIcon = tw.img``
const StarIcon = tw.img``
const SavedPlaces = tw.div``

export default Search