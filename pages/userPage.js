import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function UserPage() {
    const router = useRouter()
    const {name, photoUrl, email} = router.query
    
  return (
    <>
    <div>{name}</div>
    <img src={photoUrl} alt="" />
    </>
  )
} 

export default UserPage