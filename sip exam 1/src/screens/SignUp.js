import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignupForm from '../components/SignupForm';

export default function SignUp() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h1 className='text-center'>Sign Up</h1>
        <SignupForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
