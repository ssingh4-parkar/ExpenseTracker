import { useState } from "react";
import type { Member } from "../types";

interface Props {
    members:Member[];
    saveMembers:(members:Member[])=>void
}

function MemberForm({members,saveMembers}:Props) {
    const [formData, setFormData] = useState({
        name: "",
        travel: 0,
        food: 0,
        hotel: 0,
        activities: 0,
        sightseeing: 0
    });
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: Number(value) || value }));
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const total = formData.travel + formData.food + formData.hotel + formData.activities + formData.sightseeing;
        saveMembers([...members, { ...formData, total, expenses: { ...formData } }]);
        setFormData({ name: "", travel: 0, food: 0, hotel: 0, activities: 0, sightseeing: 0 });
    }
    return (
        <div className="shadow-2xl bg-amber-100 p-5 rounded-2xl"><div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex gap-9">
                    <label htmlFor="name">Name</label>
                    <input placeholder="Name" id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="flex gap-9">
                    <label htmlFor="travel">Travel</label>
                    <input placeholder="Travel" id="travel" type="number" name="travel" value={formData.travel} onChange={handleChange} required />
                </div>

                <div className="flex gap-9">
                    <label htmlFor="food">Food</label>
                    <input id="food" type="number" name="food" value={formData.food} onChange={handleChange} required />
                </div>

                <div className="flex gap-9">
                    <label htmlFor="hotel">Hotel</label>
                    <input id="hotel" type="number" name="hotel" value={formData.hotel} onChange={handleChange} required />
                </div>
                <div className="flex gap-9">
                    <label htmlFor="activities">Activities</label>
                    <input id="activities" type="number" name="activities" value={formData.activities} onChange={handleChange} required />
                </div>

                <div className="flex gap-9">
                    <label htmlFor="sightseeing">Sightseeing</label>
                    <input id="sightseeing" type="number" name="sightseeing" value={formData.sightseeing} onChange={handleChange} required />
                </div>
                <button className="border p-1 rounded-lg hover:cursor-pointer hover:scale-105" type="submit">Add Member</button>
            </form>
        </div></div>
    )
}

export default MemberForm