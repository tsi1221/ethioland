import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="overlay">
          <h1>About EthioEstate</h1>
          <p>Your trusted partner in Ethiopian real estate.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>EthioEstate is transforming real estate in Ethiopia with transparency, technology, and trust.</p>
          <p>We help you buy, sell, and invest with confidence and simplicity.</p>
        </div>

        <div className="about-vision">
          <h2>Our Vision</h2>
          <p>To be Ethiopia’s most trusted digital real estate platform.</p>
        </div>

        <div className="about-values">
          <h2>Core Values</h2>
          <ul>
            <li>Trust & Transparency</li>
            <li>Innovation & Technology</li>
            <li>Customer-Centric Approach</li>
            <li>Local Expertise</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
