import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../Context/CoinContex";
import LineChart from "../../Component/lineChart/LineChart";

const Coin = () => {
  let { coinId } = useParams();
  let { currency } = useContext(CoinContext);
  let [coinData, setCoinData] = useState();
  let [coinHisdata, setCoinHisData] = useState();

  const fetch_data = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": import.meta.env.VITE_HEADER_02 },
      body: undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };

  let fetchHisData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": import.meta.env.VITE_HEADER_02 },
      body: undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoinHisData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_data();
    fetchHisData();
  }, [currency]);

  if (coinData) {
    return (
      <div className="coin text-light">
        <div className="coin_name">
          <img src={coinData.image.large} alt="" />
          <p className="fw-bold">
            {coinData.name} {coinData.symbol.toUpperCase()}
          </p>
        </div>
        <div className="coin-chart">
          <LineChart coinHisdata={coinHisdata} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {(
                coinData?.market_data?.current_price?.[currency.name] ||
                coinData?.market_data?.current_price?.usd
              ).toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {(
                coinData?.market_data?.market_cap?.[currency.name] ||
                coinData?.market_data?.market_cap?.usd
              ).toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {(
                coinData?.market_data?.high_24h?.[currency.name] ||
                coinData?.market_data?.high_24h?.usd
              ).toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.symbol}{" "}
              {(
                coinData?.market_data?.low_24h?.[currency.name] ||
                coinData?.market_data?.low_24h?.usd
              ).toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    <div className="spinner">
      <div className="spin"></div>
    </div>;
  }
};

export default Coin;
