import React, { useEffect } from 'react'
import {onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGE } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
const dispatch=useDispatch();
const navigate=useNavigate();
const user=useSelector((store)=>store.user)
const showGptSearch=useSelector(store => store.gpt.showGptSearch)
const handleSignOut= ()=>{
  signOut(auth).then(() => {
   
  }).catch((error) => {
    navigate("/error");
  });
}
useEffect(()=>{
 const unsubscribe= onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const {uid,email,displayName,photoURL} = user;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL }));
      navigate("/browser")
    } else {
      dispatch(removeUser());
      navigate("/")
    }
  });
  //Unsubsccribe when component unmounts
  return () => unsubscribe();
 },[])

 const handleGptSearchClick= ()=>{
   dispatch(toggleGptSearchView());
 }

 const handleLanguageChange=(e)=>{
dispatch(changeLanguage(e.target.value) );
 }
 
  return (

  <div className=' absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>

   {/*<img className={`${user ? ' w-32' :' w-48' } mx-auto md:mx-0`}*/}
   <img className= 'w-32 mx-auto md:mx-0'
      src={LOGO}
      alt="logo"
   />
      
     {user && 
      <div className='flex p-2 justify-between'>
        {showGptSearch && (
          <select className='p-2 m-2 bg-slate-900 text-white rounded-md' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGE.map((lang)=>(<option key={lang.identifier} value={lang.identifier} >{lang.name}</option>))}
        </select>
        )}

       <button className='mx-4 my-2  bg-red-700 py-2 px-4 text-white rounded-lg
        'onClick={handleGptSearchClick}>
        {showGptSearch ? "HomePage" : "GPT Search"} 
        </button>

        <img className='w-12 h-12 mx-2 hidden md:inline-block'
        src={user?.photoURL}
        /*src='https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e'*/
        alt="avatar"/>

        <button onClick={handleSignOut}className='font-bold text-white '>Signout</button>
      </div>} 

    </div>
    
  )
}

export default Header