import React, { Profiler, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import './HomePage.css';


import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';




const HomePage = () => {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className="homepage">
      <header>
       
      </header>



      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/videos/real-estate.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <div className="hero-left">
            <h1>Find Real Estate & Get<br />Your Dream Place</h1>
            <p>
              Discover luxury homes, affordable housing, and investment properties with expert support.
            </p>

            <div className="search-box">
              <div className="tabs">
                <button className="active">Buy</button>
                <button>Rent</button>
              </div>
              <div className="search-fields">
                <input type="text" placeholder="City Location" />
                <input type="text" placeholder="Min Price" />
                <input type="text" placeholder="Max Price" />
                <button className="search-btn">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="stats">
              <div><strong>16+</strong><p>Years of Experience</p></div>
              <div><strong>200</strong><p>Award Gained</p></div>
              <div><strong>2000+</strong><p>Property Ready</p></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="img-grid">
              <img src="/images/image1.png" alt="Building 1" className="img-rect" />
              <img src="/images/image2.png" alt="Building 2" className="img-round" />
              <img src="/images/image3.png" alt="Building 3" className="img-rect" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
