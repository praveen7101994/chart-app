import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const App = () => {
  const getNewList = async () => {
    const xDataResp = await Axios.get("https://retoolapi.dev/gDa8uC/data");
    const yDataResp = await Axios.get("https://retoolapi.dev/o5zMs5/data");

    const { data: xData } = xDataResp;
    const { data: yData } = yDataResp;

    let newList = [];
    let index = 1;
    yData.forEach((yElement) => {
      let matchedObj = xData.find(
        (xElement) => xElement["id"] === yElement["id"]
      );

      if (matchedObj && index <= 50) {
        let newObj = { ...yElement, xRandomNumber: matchedObj.RandomNumber };
        newList.push(newObj);
        index++;
      }
    });
    return newList;
  };

  const [data, setdata] = useState([]);

  useEffect(() => {
    const execute = async () => {
      const localData = await getNewList();
      setdata(localData);
    };

    execute();
  }, []);

  return (
    <center>
      <h3>Simple Chart-App</h3>
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="RandomNumber" stroke="#8884d8" />
        <Line type="monotone" dataKey="xRandomNumber" stroke="#82ca9d" />
      </LineChart>
    </center>
  );
};

export default App;
