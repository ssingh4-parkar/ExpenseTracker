import { Pie } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrips } from "../utils/storage";


chartjs.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Summary() {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const trips = getTrips();
    const t = trips.find((x: any) => x.id === tripId);
    if (t) setTrip(t);
  }, [tripId]);

  if (!trip) return <div className="text-center text-xl p-6">Loading...</div>;

  const memberTotals = trip.members.map((m: any) => m.total);

  const totalTrip = memberTotals.reduce((a: number, b: number) => a + b, 0);

  const avg = totalTrip / trip.members.length;

  type Settlement = { from: string; to: string; amount: number };
  const settlements: Settlement[] = [];

  let creditors = trip.members//people who paid more than average (they should receive money).
    .map((m: any) => ({ name: m.name, balance: +(m.total - avg).toFixed(2) }))
    .filter((m: any) => m.balance > 0)  
    .sort((a: any, b: any) => b.balance - a.balance);

  let debtors = trip.members//people who paid less than average (they owe money).
    .map((m: any) => ({ name: m.name, balance: +(avg - m.total).toFixed(2) }))
    .filter((m: any) => m.balance > 0)
    .sort((a: any, b: any) => b.balance - a.balance);

  let i = 0;
  let j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].balance, creditors[j].balance);
    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: +amount.toFixed(2)
    });
    debtors[i].balance = +(debtors[i].balance - amount).toFixed(2);
    creditors[j].balance = +(creditors[j].balance - amount).toFixed(2);

    if (debtors[i].balance <= 0) i++;
    if (creditors[j].balance <= 0) j++;
  }

  const totalData = {
    labels: trip.members.map((m: any) => m.name),
    datasets: [
      {
        data: memberTotals,
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"]
      }
    ]
  };
  const categoryColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="bg-amber-600 p-6 min-h-[90vh]">

      <h2 className="text-white text-3xl text-center font-semibold mb-6">
        Total Trip Expenditure: <span className="font-bold">{totalTrip}</span>
      </h2>

      <div className="flex flex-wrap gap-6 justify-center"> 

        {/*Total pie chart */}
        <div className="w-[400px] h-[430px] bg-white rounded-xl shadow-md p-4">
          <h3 className="text-center font-semibold text-lg mb-2">Total Contribution</h3>
          <Pie
            data={totalData}
            options={{
              plugins: {
                legend: { position: "bottom" },
                datalabels: { color: "#fff" }
              }
            }}
          />
        </div>

        {/*Individual expense breakdown charts */}
        {trip.members.map((m: any, idx: number) => {
          const data = {
            labels: ["Travel", "Food", "Hotel", "Activities", "Sightseeing"],
            datasets: [
              {
                data: [
                  m.expenses.travel,
                  m.expenses.food,
                  m.expenses.hotel,
                  m.expenses.activities,
                  m.expenses.sightseeing
                ],
                backgroundColor: categoryColors
              }
            ]
          };
          return (
            <div
              key={idx}
              className="w-[260px] h-[280px] bg-white rounded-xl shadow-md p-3"
            >
              <h4 className="text-center text-lg font-semibold mb-2">
                {m.name}
              </h4>
              <Pie
                data={data}
                options={{
                  plugins: { legend: { position: "bottom" } }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Settlements Table */}
      <div className="bg-white p-6 mt-10 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Settlements</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3">From</th>
              <th className="border p-3">To</th>
              <th className="border p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {settlements.map((s, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-3">{s.from}</td>
                <td className="border p-3">{s.to}</td>
                <td className="border p-3 font-semibold text-green-700">
                  ₹ {s.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {settlements.length === 0 && (
          <div className="text-center text-gray-600 p-4">
            All expenses are already balanced.
          </div>
        )}
      </div>
    </div>
  );
}
export default Summary;