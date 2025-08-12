import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaShare, FaEye } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './PropertyCard.css';

const PropertyCard = ({ property, onFavorite, onApply, onViewDetails, isFavorited = false }) => {
  const [showMap, setShowMap] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    message: '',
    offerPrice: ''
  });

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await onApply(property.id, applicationData);
      setShowApplicationForm(false);
      setApplicationData({ message: '', offerPrice: '' });
    } catch (error) {
      console.error('Error applying:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'green';
      case 'PENDING': return 'orange';
      case 'REJECTED': return 'red';
      case 'SOLD': return 'purple';
      case 'RENTED': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.img} alt={property.title} />
        <div className="property-overlay">
          <div className="property-status" style={{ backgroundColor: getStatusColor(property.status) }}>
            {property.status}
          </div>
          <div className="property-actions">
            <button 
              className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={() => onFavorite(property.id)}
            >
              <FaHeart />
            </button>
            <button className="share-btn">
              <FaShare />
            </button>
            <button className="view-btn" onClick={() => onViewDetails(property.id)}>
              <FaEye />
            </button>
          </div>
        </div>
      </div>

      <div className="property-content">
        <div className="property-header">
          <h3>{property.title}</h3>
          <div className="property-price">{formatPrice(property.price)}</div>
        </div>

        <div className="property-location">
          <FaMapMarkerAlt />
          <span>{property.adress}, {property.city}</span>
        </div>

        <div className="property-details">
          <div className="detail-item">
            <FaBed />
            <span>{property.bedroom} Bedrooms</span>
          </div>
          <div className="detail-item">
            <FaBath />
            <span>{property.bathroom} Bathrooms</span>
          </div>
          <div className="detail-item">
            <FaRulerCombined />
            <span>{property.size || 'N/A'} sq ft</span>
          </div>
        </div>

        <div className="property-type">
          <span className={`type-badge ${property.type.toLowerCase()}`}>
            {property.type}
          </span>
          <span className={`property-badge ${property.property.toLowerCase()}`}>
            {property.property}
          </span>
        </div>

        <div className="property-description">
          <p>{property.content.substring(0, 100)}...</p>
        </div>

        <div className="property-footer">
          <div className="property-views">
            <FaEye />
            <span>{property.views || 0} views</span>
          </div>
          
          <div className="property-buttons">
            <button 
              className="map-btn"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? 'Hide Map' : 'View Map'}
            </button>
            
            {property.status === 'APPROVED' && (
              <button 
                className="apply-btn"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply Now
              </button>
            )}
          </div>
        </div>

        {showMap && (
          <div className="property-map">
            <MapContainer
              center={[parseFloat(property.latitude), parseFloat(property.longitude)]}
              zoom={15}
              style={{ height: '200px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[parseFloat(property.latitude), parseFloat(property.longitude)]}>
                <Popup>
                  <strong>{property.title}</strong><br />
                  {property.adress}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>

      {showApplicationForm && (
        <div className="application-modal">
          <div className="application-content">
            <h3>Apply for {property.title}</h3>
            <form onSubmit={handleApply}>
              <div className="form-group">
                <label>Message to Owner:</label>
                <textarea
                  value={applicationData.message}
                  onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                  placeholder="Tell the owner why you're interested in this property..."
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Offer Price (optional):</label>
                <input
                  type="number"
                  value={applicationData.offerPrice}
                  onChange={(e) => setApplicationData({...applicationData, offerPrice: e.target.value})}
                  placeholder="Enter your offer price"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowApplicationForm(false)}>
                  Cancel
                </button>
                <button type="submit">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;