import React from "react";

export const RestaurantDetails = ({
  image,
  name,
  cost,
  cuisine,
  rating,
  reviews,
  votes,
  minPrice,
  paymentMethods,
}) => {
  return (
    <div className="full-box">
      <div className="card">
        <div className="box1">
          <img src={image} alt="" />
        </div>
        <div className="box2">
          <h1>{name}</h1>
          <div className="gray">{cuisine}</div>
          <div className="gray">Cost ₹ {cost} for one</div>
          <div className="min-price">Min ₹ {minPrice} • Up to 30 min</div>
          <div className="min-price">Min{paymentMethods.data}</div>
        </div>
        <div className="box3">
          <div className="rating">{rating}</div>
          <div className="votes">{votes} votes</div>
          <div className="votes">{reviews} Reviews</div>
        </div>
      </div>
      <div className="online">Order Online </div>
    </div>
  );
};
