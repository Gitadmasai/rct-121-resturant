import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { RestaurantDetails } from "./components/RestaurantDetails";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [ratingOrder, setRatingOrder] = useState("");
  const [costOrder, setCostOrder] = useState("asc");
  const [filterRating, setFilterRating] = useState();
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const [cash, setCash] = useState(null);
  const [card, setCard] = useState(null);
  const [upi, setUpi] = useState(null);

  useEffect(() => {
    fetchData({
      page,
      ratingOrder,
      costOrder,
      filterRating,
      q,
      cash,
      card,
      upi,
    });
  }, [page, ratingOrder, costOrder, filterRating, q, cash, card, upi]);

  const fetchData = async ({
    page,
    ratingOrder,
    costOrder,
    filterRating,
    q,
    cash,
    card,
    upi,
  }) => {
    setLoading(true);
    const paramsForPayment = {};
    if (cash !== null) paramsForPayment["paymentMethods.cash"] = cash;
    if (card !== null) paramsForPayment["paymentMethods.card"] = card;
    if (upi !== null) paramsForPayment["paymentMethods.upi"] = upi;
    axios({
      method: "GET",
      url: "http://localhost:3001/food",
      params: {
        _page: page,
        _limit: 4,
        _sort: "rating,cost",
        _order: `${ratingOrder},${costOrder}`,
        rating_gte: filterRating,
        q: q,
        ...paramsForPayment,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  console.log(data);

  return (
    <div className="App">
      <h1 className="center">Restaurant Details</h1>
      <div className="center">
        <h2>Search</h2>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button className="pag-btn" onClick={() => setQ(text)}>
          Search
        </button>
      </div>
      {loading && <div>loading...</div>}
      <div className="center">
        <div>
          <button
            disabled={ratingOrder === "desc"}
            onClick={() => setRatingOrder("desc")}
            className="pag-btn"
          >
            Rating Sort
          </button>
          <button
            disabled={ratingOrder === "asc"}
            onClick={() => setRatingOrder("asc")}
            className="pag-btn"
          >
            Rating Sort
          </button>
        </div>
        <div>
          <button
            disabled={costOrder === "desc"}
            onClick={() => setCostOrder("desc")}
            className="pag-btn"
          >
            Cost Sort
          </button>
          <button
            disabled={costOrder === "asc"}
            onClick={() => setCostOrder("asc")}
            className="pag-btn"
          >
            Cost Sort
          </button>
        </div>
      </div>
      <div className="center">
        <h2>Filter by Rating star</h2>
        <button onClick={() => setFilterRating(1)} className="pag-btn-child">
          1⭐
        </button>
        <button onClick={() => setFilterRating(2)} className="pag-btn-child">
          2⭐
        </button>
        <button onClick={() => setFilterRating(3)} className="pag-btn-child">
          3⭐
        </button>
        <button onClick={() => setFilterRating(4)} className="pag-btn-child">
          4⭐
        </button>
        <button onClick={() => setFilterRating(0)} className="pag-btn-child">
          All ⭐
        </button>
      </div>
      <div className="center">
        <button onClick={() => setCash(!cash)}>
          Cash - {cash ? "TRUE" : "FALSE"}
        </button>
        <button onClick={() => setCard(!card)}>
          card - {card ? "TRUE" : "FALSE"}
        </button>
        <button onClick={() => setUpi(!upi)}>
          UPI - {upi ? "TRUE" : "FALSE"}
        </button>
        <button
          onClick={() => {
            setCash(null);
            setCard(null);
            setUpi(null);
          }}
        >
          RESET
        </button>
      </div>
      <div className="grid">
        {data.map((item) => (
          <RestaurantDetails key={item.id} {...item} />
        ))}
      </div>
      <div className="center">
        <button
          className="pag-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <PaginationComponent
          currentPage={page}
          lastPage={6}
          onPageChange={setPage}
        />
        <button
          className="pag-btn"
          disabled={page === 6}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
//given the current page
//last page
//pagination Component
const PaginationComponent = ({ currentPage, lastPage, onPageChange }) => {
  const arr = new Array(lastPage).fill(0);
  return (
    <div>
      {arr.map((item, page) => (
        <button
          key={page}
          className="pag-btn-child"
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 === currentPage}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default App;
