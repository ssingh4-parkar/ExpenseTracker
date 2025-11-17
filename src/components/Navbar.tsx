import React from 'react'
import companyLogo from '../assets/companyLogo.png'
import { useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate();
    function home(){
        navigate("/");
    }
    return (
        <div className='flex h-[80px] bg-gradient-to-r from-green-400 via-blue-400 to-purple-500'>
            <div onClick={home} className='flex gap-2 items-center p-5 hover:cursor-pointer'>
                <span><img className='h-12' src={companyLogo} alt="Company Logo" /></span>
                <span><p className='text-lg '>ExpenseTracker</p></span>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Navbar