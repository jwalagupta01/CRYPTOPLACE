import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContex";
import {Link} from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setinput] = useState("");

  let inputHandler = (event) => {
    setinput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  let searchhandler = async (event) => {
    event.preventDefault();
    let coin = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLocaleLowerCase());
    });
    setDisplayCoin(coin);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero d-flex text-center align-items-center justify-content-center">
        <h1 className="fw-bold">
          Largest <br /> Crypto Marketplace
        </h1>
        <p>Welcome to the world's largest cryptocurrency</p>
        <form
          onSubmit={searchhandler}
          className="form bg-light rounded d-flex align-items-center justify-content-between fs-6 p-2"
        >
          <input
            required
            value={input}
            onChange={inputHandler}
            type="search"
            placeholder="Search Crypto..."
            className="ps-3 fs-6"
            list="coinList"
          />

          <datalist id="coinList">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} className="form_option" />
            ))}
          </datalist>

          <button type="submit" className="rounded py-1 px-4 text-light">
            Search
          </button>
        </form>
      </div>
      <div className="crypto_table rounded">
        <div className="table_layout px-3 py-3 border-bottom border-secondary align-items-center">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-end market_cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 30).map((item, index) => (
          <Link to={`/coin/${item.id}`}
            className="table_layout px-3 py-3 border-bottom border-secondary align-items-center"
            key={index}
          >
            <p>{item.market_cap_rank}</p>
            <div className="d-flex align-items-center">
              <img className="me-3" src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>{currency.symbol + " " + item.current_price}</p>
            <p
              className={
                item.market_cap_change_percentage_24h > 0 ? "green" : "red"
              }
            >
              {Math.floor(item.market_cap_change_percentage_24h * 100) / 100}
            </p>
            <p className="text-end market_cap">
              {currency.symbol + " " + item.market_cap}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
