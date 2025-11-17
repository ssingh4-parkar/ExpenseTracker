import './App.css'
import Navbar from './components/Navbar.tsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Trip from './pages/Trip.tsx'
import Expenses from './pages/Expenses.tsx'
import Contribution from './pages/Contribution.tsx'
import Summary from './pages/Summary.tsx'

function App() {

  return (
    <div className='bg-gray-500 min-h-screen p-6'>
      <div className='mx-20 shadow-2xl' >
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trip' element={<Trip />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/contribution' element={<Contribution />} />
          <Route path='/summary' element={<Summary />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
