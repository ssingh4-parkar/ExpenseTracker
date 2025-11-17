import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import MemberForm from "../components/MemberForm";
import { getTrips, saveTrips } from "../utils/storage";

function Expenses() {
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => setShowForm(prev => !prev);
    const [members, setMembers] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>(getTrips());
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get("tripId");

    useEffect(() => {
        const trip = trips.find((t: any) => t.id === tripId);
        if (trip) setMembers(trip.members);
    }, [tripId, trips]);

    const saveMembers = (updatedMembers: any[]) => {
        setMembers(updatedMembers);
        const updatedTrips = trips.map((t: any) => t.id === tripId ? { ...t, members: updatedMembers } : t);
        setTrips(updatedTrips);
        saveTrips(updatedTrips);
    }
    const removeMember = (name: string) => {
        saveMembers(members.filter(m => m.name !== name));
    }

    const navigate = useNavigate();
    function contribution(memberName: string) {
        navigate(`/contribution?tripId=${tripId}&member=${memberName}`);
    }
    function getsummary() {
        navigate(`/summary?tripId=${tripId}`);
    }

    return (
        <div className='min-h-[90vh] bg-amber-600 flex flex-col items-center p-6'>
            <div className='p-5 flex justify-center text-white text-4xl font-bold tracking-wide'>
                <p>Trip Expenses</p>
            </div>

            <div className='flex flex-col gap-4 justify-center p-7 w-[500px]'>
                <button onClick={toggleForm} className="bg-blue-200 text-gray-900 font-medium border border-gray-400 rounded-lg p-3 hover:bg-blue-400 hover:text-white focus:outline-none hover:ring-2 hover:ring-blue-500 transition-all">Add Group Member</button>
                {showForm && <MemberForm members={members} saveMembers={saveMembers} />}
            </div>
            <div className='mt-5 w-full flex justify-center'>
                <ul className='flex flex-col gap-4 p-4 w-[750px]'>
                    {members.map((m) => (
                        <li key={m.name} className='flex items-center justify-between gap-5 p-4 bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer'>
                            <span onClick={() => contribution(m.name)} className='font-medium text-gray-800 hover:text-blue-600 transition-colors'>
                                {m.name}
                            </span>
                            <button onClick={() => removeMember(m.name)} className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 hover:shadow-md transition-all'>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-center items-center mt-6">
                <button onClick={getsummary} className="bg-red-300 text-white font-semibold border rounded-lg p-3 hover:bg-red-400 hover:scale-110 hover:shadow-md transition-all">Get Summary</button>
            </div>
        </div>
    )
}
export default Expenses;