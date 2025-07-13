import React from "react";
import "./ListPage.scss";
import FilterBar from "./FilterBar";
import PropertyCard from "./PropertyCard";
import MapView from "./MapView";

const demoProperties = [
  {
    id: 1,
    title: "A Great Apartment Next to the Beach!",
    address: "456 Park Avenue, London",
    price: "$1000",
    bedrooms: 2,
    bathrooms: 1,
    images: [
      "/images/house1.jpg",
      "/images/house2.jpg",
      "/images/house3.jpg",
    ],
    coords: [51.5074, -0.1278],
    actions: [
      { type: "save", text: "Save" },
      { type: "chat", text: "Chat" }
    ],
  },
  {
    id: 2,
    title: "An Awesome Apartment Near the Park!",
    address: "789 Oxford Street, London",
    price: "$1500",
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "/images/house2.jpg",
      "/images/house3.jpg",
      "/images/house1.jpg",
    ],
    coords: [52.4862, -1.8904],
    actions: [
      { type: "save", text: "Save" },
      { type: "chat", text: "Chat" }
    ],
  },
  {
    id: 3,
    title: "A New Apartment in the City!",
    address: "101 Baker Street, London",
    price: "$800",
    bedrooms: 1,
    bathrooms: 1,
    images: [
      "/images/house3.jpg",
      "/images/house1.jpg",
      "/images/house2.jpg",
    ],
    coords: [53.4808, -2.2426],
    actions: [
      { type: "save", text: "Save" },
      { type: "chat", text: "Chat" }
    ],
  },
  {
    id: 4,
    title: "Modern City Apartment!",
    address: "202 Main Street, London",
    price: "$900",
    bedrooms: 1,
    bathrooms: 1,
    images: [
      "/images/house2.jpg",
      "/images/house3.jpg",
    ],
    coords: [59.4808, -2.2426],
    actions: [
      { type: "save", text: "Save" },
      { type: "chat", text: "Chat" }
    ],
  },
  {
    id: 5,
    title: "Suburban House with Garden",
    address: "33 King Street, London",
    price: "$1100",
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "/images/house1.jpg",
      "/images/house3.jpg",
    ],
    coords: [57.4808, -2.2426],
    actions: [
      { type: "save", text: "Save" },
      { type: "chat", text: "Chat" }
    ],
  },
];

const ListPage = () => {
  return (
    <div className="list-page">
      <div className="list-left">
        <FilterBar />
        <div className="property-list">
          {demoProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      <div className="list-right">
        <MapView properties={demoProperties} />
      </div>
    </div>
  );
};

export default ListPage;
