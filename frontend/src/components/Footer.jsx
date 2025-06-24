import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">TravelEase</h3>
            <p className="mb-4 text-blue-200">
              Your one-stop solution for all your travel and entertainment needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/flights" className="text-blue-200 hover:text-white transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="/trains" className="text-blue-200 hover:text-white transition-colors">
                  Trains
                </Link>
              </li>
              <li>
                <Link to="/buses" className="text-blue-200 hover:text-white transition-colors">
                  Buses
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-blue-200 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="text-blue-200 hover:text-white transition-colors">
                <a href="#">FAQs</a>
              </li>
              <li className="text-blue-200 hover:text-white transition-colors">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="text-blue-200 hover:text-white transition-colors">
                <a href="#">Terms & Conditions</a>
              </li>
              <li className="text-blue-200 hover:text-white transition-colors">
                <a href="#">Customer Support</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Travel Street, Digital City, India 400001</span>
              </p>
              <p className="flex items-center">
                <PhoneCall size={18} className="mr-2 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>support@travelease.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-800">
          <p className="text-center text-blue-300">
            &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;