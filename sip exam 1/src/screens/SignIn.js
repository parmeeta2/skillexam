import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignInForm from '../components/SignInForm';

export default function SignUp() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h1 className='text-center'>Sign In</h1>
        <SignInForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
