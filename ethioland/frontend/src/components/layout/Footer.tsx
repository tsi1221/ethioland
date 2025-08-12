import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-primary-400" />
              <span className="font-bold text-xl">EthioLand</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in Ethiopian real estate. Find your dream property with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/properties/create" className="text-gray-400 hover:text-white transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+251 911 123 456</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>info@ethioland.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EthioLand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;