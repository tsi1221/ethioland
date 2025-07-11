import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="overlay">
          <h1>Contact EthioEstate</h1>
          <p>We’d love to hear from you — reach out today!</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit" className="cta-primary">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Phone:</strong> <a href="tel:+251928505904">+251 928 505 904</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@ethioestate.et">info@ethioestate.et</a></p>
          <p><strong>Address:</strong> Bole, Addis Ababa, Ethiopia</p>
          <p><strong>Hours:</strong> Mon–Fri, 9:00 AM – 5:00 PM</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
