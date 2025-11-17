import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import type { Trip as TripType } from '../types';
import { getTrips, saveTrips } from '../utils/storage';

function Trip() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState<TripType[]>(getTrips());
    const [newTrip, setNewTrip] = useState("");

    const addTrip = () => {
        if (!newTrip) return;
        const updatedTrips = [...trips, { id: uuid(), name: newTrip, members: [] }];
        setTrips(updatedTrips);
        saveTrips(updatedTrips);
        setNewTrip("");
    };

    const removeTrip = (id: string) => {
        const updatedTrips = trips.filter(t => t.id !== id);
        setTrips(updatedTrips);
        saveTrips(updatedTrips);
    };

    function expenses(id: string) {
        navigate(`/expenses?tripId=${id}`);
    }
    return (
        <div className='min-h-[90vh] bg-amber-600 p-6'>
            <div className='p-5 flex justify-center text-white text-4xl font-bold tracking-wide'>
                <p>Trip Details</p>
            </div>

            <div className='flex gap-4 justify-center p-7'>
                <input className='w-[800px] px-4 py-3 placeholder-gray-400 rounded-lg border border-gray-400 bg-gray-800 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner' value={newTrip} onChange={(e) => setNewTrip(e.target.value)} type="text" placeholder="Track new trip's expense"/>
                <button onClick={addTrip} className='bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all'> Add</button>
            </div>

            <div className='mt-5'>
                <div>
                    <p className='text-center text-lg font-medium text-white mb-2'>Previous trip details</p>
                </div>
                <div>
                    <ul className='flex flex-col gap-4 p-4 m-auto w-[750px]'>
                        {trips.map(t => (
                            <li key={t.id} className='flex justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                                <span onClick={() => expenses(t.id)} className='cursor-pointer font-medium text-gray-800 hover:text-blue-600 transition-colors'>{t.name}</span>
                                <button onClick={() => removeTrip(t.id)} className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 hover:shadow-md transition-all'>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Trip;