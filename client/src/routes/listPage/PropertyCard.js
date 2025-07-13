import React from "react";
import { FaRegHeart, FaRegComments } from "react-icons/fa";
import "./PropertyCard.scss";

const PropertyCard = ({ property }) => {
  const { title, address, price, bedrooms, bathrooms, images, actions } = property;

  return (
    <div className="property-card">
      <div className="image-gallery">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`${title} ${i + 1}`} />
        ))}
      </div>

      <div className="details">
        <h3>{title}</h3>
        <p>{address}</p>
        <p>{bedrooms} Beds • {bathrooms} Baths</p>
        <p className="price">{price}</p>

        <div className="actions">
          {actions.map(({ type, text }) => {
            if (type === "save")
              return (
                <button key={type} className="save-btn" aria-label="Save property">
                  <FaRegHeart /> {text}
                </button>
              );
            if (type === "chat")
              return (
                <button key={type} className="chat-btn" aria-label="Chat about property">
                  <FaRegComments /> {text}
                </button>
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
