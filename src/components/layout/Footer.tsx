import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white font-sora leading-none">
                  Blue Horizon
                </span>
                <span className="text-xs text-blue-300 font-inter leading-none">
                  Calculator Suite
                </span>
              </div>
            </Link>
            <p className="text-slate-300 text-sm font-inter max-w-md">
              A comprehensive suite of financial calculators and tools designed to help you make informed decisions. 
              Start with our powerful currency converter and explore more calculators coming soon.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sora mb-4">
              Calculators
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/currency-converter" 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-inter"
                >
                  Currency Converter
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-sm font-inter cursor-not-allowed">
                  Loan Calculator
                  <span className="ml-2 text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded-full">
                    Soon
                  </span>
                </span>
              </li>
              <li>
                <span className="text-slate-500 text-sm font-inter cursor-not-allowed">
                  Investment Calculator
                  <span className="ml-2 text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded-full">
                    Soon
                  </span>
                </span>
              </li>
              <li>
                <span className="text-slate-500 text-sm font-inter cursor-not-allowed">
                  Tax Calculator
                  <span className="ml-2 text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded-full">
                    Soon
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sora mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-inter"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-inter"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-inter"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors text-sm font-inter"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm font-inter">
              © 2024 Blue Horizon Calculator Suite. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs font-inter mt-2 md:mt-0">
              Exchange rates provided by{' '}
              <a 
                href="https://www.exchangerate-api.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                ExchangeRate-API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 