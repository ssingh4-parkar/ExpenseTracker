import headerLogo from '../assets/headerLogo.png'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate=useNavigate();
    function trip(){
        navigate("/trip");
    }
    return (
        <div className='h-[600px] flex bg-amber-600 '>
            <div className='flex flex-col justify-center items-center flex-1 gap-8'>
                <p className='text-5xl text-white font-semibold'>Manage your expenses <br /> With ExpenseTracker</p>
                <div className='flex items-center gap-3 text-white text-lg font-light'>
                    <p>Plan Smart, Spend Smart – Your Trip Expense Companion</p>
                </div>
                <button onClick={trip} className='bg-white px-2 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300 '>Track Now</button>
            </div>


            <div className='flex justify-center items-center flex-1'><img src={headerLogo} /></div>
        </div>
    )
}

export default Header