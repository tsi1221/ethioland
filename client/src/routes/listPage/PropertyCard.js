import React from "react";
import { FaRegHeart, FaRegComments } from "react-icons/fa";
import "./PropertyCard.scss";
import { Link } from 'react-router-dom';
import Slider from "../Slider/Slider"; // adjust path if needed

const PropertyCard = ({ property }) => {
  const { title, address, price, bedrooms, bathrooms, images, actions } = property;

  return (
    <div className="property-card">
      <div className="image-gallery">
        <Slider images={images} />
      </div>

      <div className="details">
        <h3>{title}</h3>
        <p>{address}</p>
        <p>{bedrooms} Beds • {bathrooms} Baths</p>
        <p className="price">{price}</p>

        <div className="actions">
          {actions.map(({ type, text }) => {
            if (type === "save") {
              return (
                <button key={type} className="save-btn" aria-label="Save property">
                  <FaRegHeart /> {text}
                </button>
              );
            }
            if (type === "chat") {
              return (
              <Link to="/chat" aria-label="Chat about property">
  <button key={type} className="chat-btn">
    <FaRegComments /> {text}
  </button>
</Link>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
