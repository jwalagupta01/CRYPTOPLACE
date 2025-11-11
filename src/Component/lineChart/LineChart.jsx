import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ coinHisdata }) => {
  let [data, setdata] = useState([["date", "prices"]]);

  useEffect(() => {
    let dataCopy = [["date", "prices"]];
    if (coinHisdata.prices) {
      coinHisdata.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setdata(dataCopy);
    }
  }, [coinHisdata]);

  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default LineChart;
