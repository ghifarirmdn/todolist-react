import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { TodoContext } from "../context/TodoContext";

const Dashboard = () => {
  const location = useLocation();
  const { todos } = useContext(TodoContext);

  const totalDone = todos.filter((todo) => todo.status === "done").length;
  const totalProgress = todos.filter(
    (todo) => todo.status === "progress"
  ).length;
  const totalFailed = todos.filter((todo) => todo.status === "failed").length;

  const pData = [totalDone, totalProgress, totalFailed];
  const xLabels = ["Done", "Progress", "Failed"];

  return (
    <div className="flex">
      <Sidebar />
      {(location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/") && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome To Todo Dashboard</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            <BarChart
              width={500}
              height={300}
              series={[
                {
                  data: pData,
                  label: "Todo Status",
                  yAxisKey: "leftAxisId",
                },
              ]}
              xAxis={[{ data: xLabels, scaleType: "band" }]}
              yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
              rightAxis="rightAxisId"
            />
            <LineChart
              width={500}
              height={300}
              series={[{ data: pData, label: "Todo Status" }]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: totalDone, label: "Done" },
                    { id: 1, value: totalProgress, label: "Progress" },
                    { id: 2, value: totalFailed, label: "Failed" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <table className="mt-10 min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border-b">No</th>
                <th className="p-2 border-b">Todo Name</th>
                <th className="p-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td className="p-2 border-b text-center">{todo.id}</td>
                  <td className="p-2 border-b text-center">{todo.title}</td>
                  <td className="p-2 border-b text-center">{todo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
