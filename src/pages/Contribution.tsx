import { Pie } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrips } from "../utils/storage";

chartjs.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Contribution() {
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get("tripId");
    const memberName = searchParams.get("member");
    const [member, setMember] = useState<any>(null);

    useEffect(() => {
        const trips = getTrips();
        const trip = trips.find((t: any) => t.id === tripId);
        if (trip) {
            const m = trip.members.find((x: any) => x.name === memberName);
            setMember(m);
        }
    }, [tripId, memberName]);

    if (!member) return <div className="text-center text-lg text-white p-6">Loading...</div>;

    const expdata = {
        labels: ["Travel", "Food", "Hotel", "Activities", "Sightseeing"],
        datasets: [
            {
                data: [
                    member.expenses.travel,
                    member.expenses.food,
                    member.expenses.hotel,
                    member.expenses.activities,
                    member.expenses.sightseeing
                ],
                backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"]
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom"
            },
            datalabels: {
                color: "white",
            }
        }
    };

    return (
        <div className="bg-amber-600 flex flex-col min-h-[90vh] p-4">

            <div className="flex justify-center p-4">
                <span className="text-white text-3xl font-semibold">{member.name}'s Contribution</span>
            </div>

            <div className="h-[600px] flex gap-4">
                <div className="rounded-lg w-[300px] p-6 text-white bg-gray-500 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 border-green-500 pb-2">Expenses-</h2>
                    <div className="mb-3 text-lg">Travel: <span className="font-medium">{member.expenses.travel}</span></div>
                    <div className="mb-3 text-lg">Food: <span className="font-medium">{member.expenses.food}</span></div>
                    <div className="mb-3 text-lg">Hotel: <span className="font-medium">{member.expenses.hotel}</span></div>
                    <div className="mb-3 text-lg">Activities: <span className="font-medium">{member.expenses.activities}</span></div>
                    <div className="mb-3 text-lg">Sightseeing: <span className="font-medium">{member.expenses.sightseeing}</span></div>
                </div>
                <div className="flex-1 flex justify-center p-3 rounded-lg bg-gray-700 shadow-md">
                    <div className="flex items-center justify-center p-3 w-[80%]">
                        <Pie data={expdata} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contribution;