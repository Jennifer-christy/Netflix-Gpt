import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/firebase'
import {  signInWithEmailAndPassword } from "firebase/auth"
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true);
  const[errorMessage,setErrorMessaage]=useState();
 
const dispatch=useDispatch()
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick=()=>{
     //checkValidData
     //console.log(email.current.value);
     //console.log(password.current.value);
     const message=checkValidData(email.current.value,password.current.value);
     setErrorMessaage(message);
     
     if(message) return;            //it cannot go further if we get error message 
      
     if(!isSignInForm){   //signup logic
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVATAR,
        }).then(() => {
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));

        // navigate("/browser")

        }).catch((error) => {
         setErrorMessaage(error.message)
        });
        
        //console.log(user);
        //navigate("/browser")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       setErrorMessaage(errorCode+"-"+errorMessage);
      });
     }else{    //signin logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value )
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       // console.log(user)
        //navigate("/browser")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessaage(errorCode+"-"+errorMessage);
      });
    
     }
  }

  const toggleSignInForm=()=>{
       setIsSignInForm(!isSignInForm);
  }
  return (
    <div >
      <Header/>
      <div className=' absolute' >
        <img className='h-screen md:h-auto object-cover' src={BG_URL} alt="logo"/>
      </div>
      <form  onSubmit={(e)=>e.preventDefault()} className=' w-full md:w-3/12 absolute p-10 bg-black bg-opacity-85 mx-auto  my-36 right-0 left-0 text-white' >
        <h1 className=' font-bold py-4 text-3xl'>{isSignInForm ?"Sign In" : "Sign Up"}</h1>
        {!isSignInForm &&
          <input ref={name}
           type='text'
          placeholder=' Enter Name ' 
          className='p-2 my-4 w-full bg-gray-700'
          />
        }
      
         <input ref={email}
         type='email'
         placeholder='Email Address' 
         className='p-2 my-4 w-full bg-gray-700'
        />

        <input ref={password}
        type='password' 
        placeholder='Password' 
        className='p-2 my-4  w-full bg-gray-700'
        />
        
        <p className=' text-red-700 text-lg font-bold py-2'>{errorMessage}</p>
        <button className='p-2 my-6  bg-red-700 w-full' onClick={handleButtonClick}  >{isSignInForm ?"Sign In" : "Sign Up"} </button>
        <p className='py-4 cursor-pointer'onClick={toggleSignInForm}>
        {isSignInForm ?"New to Netflix? Sign Up Now" : "Already an User? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login