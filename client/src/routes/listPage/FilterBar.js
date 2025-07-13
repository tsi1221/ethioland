import React from "react";
import "./FilterBar.scss";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <h3>Search Properties</h3>
      <form className="filters">
        <select name="listingType">
          <option value="">📋 Listing Type</option>
          <option value="rental">Rental</option>
          <option value="sale">Buying</option>
        </select>
 <select name="bedrooms">
          <option value="">🛏 Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <select name="bathrooms">
          <option value="">🛁 Bathrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <select name="propertyType">
          <option value="">🏠 Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Single-Family Home">Single-Family Home</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Villa">Villa</option>
          <option value="Condominium">Condominium</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Office Space">Office Space</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Residential Land">Residential Land</option>
          <option value="Agricultural Land">Agricultural Land</option>
        </select>

        
        <input type="number" name="minPrice" placeholder="💵 Min Price" />
        <input type="number" name="maxPrice" placeholder="💵 Max Price" />

       

        <input type="text" name="location" placeholder="📍 City or Location" />
        

        <button type="submit" className="search-btn">🔍 Search</button>
      </form>
    </div>
  );
};

export default FilterBar;
