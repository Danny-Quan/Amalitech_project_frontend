import React from 'react'
import Footer from '../LandingPage/Footer'

function VerifyEmail() {
  return (
    <>
    <div className='flex items-center justify-center h-[85vh]'>
      <div className='text-center'>
      <h1 className='text-4xl mb-4'>Account Verification</h1>
      <p className='mb-4'>To verify your account, click the button below</p>
      <button className='bg-blue-500/90 hover:bg-blue-500/60 text-white px-5 py-2 rounded-sm'>Verify Account</button>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default VerifyEmail