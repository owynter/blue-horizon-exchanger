import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';

// Solid financial icons inspired by Streamline Core Solid style
const FinancialIcons = {
  // Currency Exchange - solid style with multiple currency symbols
  CurrencyExchange: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 10C8 7.79086 9.79086 6 12 6H36C38.2091 6 40 7.79086 40 10V38C40 40.2091 38.2091 42 36 42H12C9.79086 42 8 40.2091 8 38V10Z" fill="#2563EB"/>
      <path d="M12 12H36M12 18H36M12 24H36M12 30H36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="6" fill="white"/>
      <path d="M20 20L28 28M28 20L20 28" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  // Investment Growth - solid chart with upward trend
  Investment: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="32" width="6" height="12" rx="3" fill="#2563EB"/>
      <rect x="12" y="26" width="6" height="18" rx="3" fill="#2563EB"/>
      <rect x="18" y="20" width="6" height="24" rx="3" fill="#2563EB"/>
      <rect x="24" y="14" width="6" height="30" rx="3" fill="#2563EB"/>
      <rect x="30" y="8" width="6" height="36" rx="3" fill="#2563EB"/>
      <path d="M36 12L42 6L48 12" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // House/Loan - solid house icon
  Loan: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 4L44 16V40C44 41.1046 43.1046 42 42 42H6C4.89543 42 4 41.1046 4 40V16L24 4Z" fill="#2563EB"/>
      <rect x="16" y="26" width="16" height="16" fill="white"/>
      <rect x="8" y="20" width="8" height="8" fill="white"/>
      <rect x="32" y="20" width="8" height="8" fill="white"/>
    </svg>
  ),
  
  // Tax Document - solid document with percentage
  Tax: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M10 6C10 4.89543 10.8954 4 12 4H28L38 14V42C38 43.1046 37.1046 44 36 44H12C10.8954 44 10 43.1046 10 42V6Z" fill="#2563EB"/>
      <path d="M28 4V14H38" fill="white"/>
      <rect x="16" y="20" width="16" height="2" fill="white"/>
      <rect x="16" y="26" width="12" height="2" fill="white"/>
      <rect x="16" y="32" width="16" height="2" fill="white"/>
      <circle cx="28" cy="36" r="3" fill="white"/>
      <path d="M25 33L31 39" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  // Wallet/Budget - solid wallet
  Budget: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 10.8954 6.89543 10 8 10H40C41.1046 10 42 10.8954 42 12V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12Z" fill="#2563EB"/>
      <rect x="34" y="18" width="6" height="12" rx="2" fill="white"/>
      <circle cx="37" cy="24" r="2" fill="#2563EB"/>
      <rect x="12" y="16" width="16" height="2" fill="white"/>
      <rect x="12" y="22" width="12" height="2" fill="white"/>
      <rect x="12" y="28" width="14" height="2" fill="white"/>
    </svg>
  ),
  
  // Clock/Retirement - solid clock with money symbol
  Retirement: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#2563EB"/>
      <circle cx="24" cy="24" r="3" fill="white"/>
      <path d="M24 8V24L34 34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M18 16V20M18 28V32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M14 24H22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
};

const Home: React.FC = () => {
  const features = [
    {
      icon: <FinancialIcons.CurrencyExchange />,
      title: "Currency Converter",
      description: "Convert between 170+ currencies and cryptocurrencies with real-time exchange rates and favorites system",
      status: "available" as const,
      href: "/currency-converter"
    },
    {
      icon: <FinancialIcons.Investment />,
      title: "Investment Calculator",
      description: "Calculate compound interest, portfolio growth, and optimize your investment strategy over time",
      status: "coming-soon" as const
    },
    {
      icon: <FinancialIcons.Loan />,
      title: "Loan Calculator",
      description: "Analyze loan payments, interest rates, amortization schedules, and total cost of borrowing",
      status: "coming-soon" as const
    },
    {
      icon: <FinancialIcons.Tax />,
      title: "Tax Calculator",
      description: "Estimate taxes, deductions, and optimize your financial planning for maximum savings",
      status: "coming-soon" as const
    },
    {
      icon: <FinancialIcons.Budget />,
      title: "Budget Planner",
      description: "Track expenses, set financial goals, and monitor your progress towards financial freedom",
      status: "coming-soon" as const
    },
    {
      icon: <FinancialIcons.Retirement />,
      title: "Retirement Calculator",
      description: "Plan for retirement with detailed projections based on your savings and investment timeline",
      status: "coming-soon" as const
    }
  ];

  const stats = [
    { label: "Currencies Supported", value: "170+" },
    { label: "Daily Calculations", value: "10K+" },
    { label: "Active Users", value: "5K+" },
    { label: "Countries Served", value: "50+" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-yellow-500 to-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sora">
              Financial Calculators
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto font-inter">
              Access powerful financial tools designed to help you make informed decisions. 
              Start with our advanced currency converter and explore more calculators as we expand our suite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/currency-converter">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 font-inter">
                  Try Currency Converter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-300 text-blue-100 hover:bg-blue-900/50 font-inter"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white font-sora">{stat.value}</div>
                <div className="text-blue-200 text-sm font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-sora leading-tight">
              Main Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
              Kickstart your financial planning using our comprehensive calculator suite. Unlock a suite of all essential tools for seamless creation of financial insights, investment analysis, and more – all without the hassle of complex spreadsheets or expensive software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                href={feature.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sora">
              Why Choose Blue Horizon?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
              We're committed to providing accurate, reliable, and easy-to-use financial tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-blue-100 rounded-full w-fit">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-sora">Lightning Fast</h3>
              <p className="text-gray-600 font-inter">
                Get instant results with our optimized calculators. No waiting, no delays - just immediate, accurate calculations.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-green-100 rounded-full w-fit">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-sora">Highly Accurate</h3>
              <p className="text-gray-600 font-inter">
                Our data comes from trusted financial sources and is updated in real-time to ensure maximum accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-purple-100 rounded-full w-fit">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-sora">User-Friendly</h3>
              <p className="text-gray-600 font-inter">
                Designed with simplicity in mind. Complex financial calculations made easy for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sora">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
              Join thousands of satisfied users who trust Blue Horizon for their financial calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="text-gray-500 border-2 border-slate-100 border-solid rounded-2xl p-8">
              <div className="items-center flex">
                <div className="relative w-full h-14 max-w-[3.50rem] mr-4 rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Sarah Chen" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold font-sora">Sarah Chen</h3>
                  <p className="text-sm font-inter">Financial Advisor</p>
                </div>
              </div>
              <div className="bg-zinc-200 w-full h-0.5 my-6"></div>
              <p className="text-gray-700 font-inter leading-relaxed">
                Blue Horizon's currency converter has become my go-to tool for client consultations. The real-time rates and favorites feature save me so much time during international investment planning.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="text-gray-500 border-2 border-slate-100 border-solid rounded-2xl p-8">
              <div className="items-center flex">
                <div className="relative w-full h-14 max-w-[3.50rem] mr-4 rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                    alt="Marcus Rodriguez" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold font-sora">Marcus Rodriguez</h3>
                  <p className="text-sm font-inter">Small Business Owner</p>
                </div>
              </div>
              <div className="bg-zinc-200 w-full h-0.5 my-6"></div>
              <p className="text-gray-700 font-inter leading-relaxed">
                As someone who deals with international suppliers daily, having access to 170+ currencies with crypto support is game-changing. The interface is clean and incredibly fast.
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="text-gray-500 border-2 border-slate-100 border-solid rounded-2xl p-8">
              <div className="items-center flex">
                <div className="relative w-full h-14 max-w-[3.50rem] mr-4 rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1461&q=80" 
                    alt="Emma Thompson" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold font-sora">Emma Thompson</h3>
                  <p className="text-sm font-inter">Investment Analyst</p>
                </div>
              </div>
              <div className="bg-zinc-200 w-full h-0.5 my-6"></div>
              <p className="text-gray-700 font-inter leading-relaxed">
                Finally, a financial calculator suite that gets it right. Looking forward to the investment and loan calculators - if they're as good as the currency converter, they'll be amazing!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Phone Mockup */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-[90rem] mx-auto bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-yellow-500 to-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>

            {/* Inner content container with constrained width */}
            <div className="max-w-[80rem] mx-auto relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* CTA Content - Left Side */}
                <div className="text-left">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sora">
                    Start Making Smarter
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                      Financial Decisions Today
                    </span>
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 font-inter leading-relaxed">
                    Join over 5,000+ users who rely on Blue Horizon for accurate financial calculations. 
                    Start with our comprehensive currency converter and discover the difference precision makes.
                  </p>
                  
                  <Link to="/currency-converter">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 font-inter">
                      Try Currency Converter Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Phone Mockup - Right Side */}
                <div className="relative lg:justify-self-end">
                  {/* iPhone Container - 320x600 aspect ratio, positioned to rise from bottom */}
                  <div className="relative" style={{ transform: 'translateY(10rem)', width: '320px', height: '600px' }}>
                    <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl w-full h-full">
                      {/* Phone Screen */}
                      <div className="bg-white rounded-[2rem] overflow-hidden w-full h-full flex flex-col">
                        {/* Status Bar with Dynamic Island */}
                        <div className="bg-white px-5 py-3 flex justify-between items-center text-sm font-medium relative">
                          {/* Dynamic Island */}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full"></div>
                          <span className="pt-4">9:41</span>
                          <div className="flex items-center gap-1 pt-4">
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                            <svg className="w-5 h-3 ml-1" viewBox="0 0 24 16" fill="none">
                              <rect x="2" y="3" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M22 7v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>

                        {/* App Content */}
                        <div className="px-5 pb-6 flex-1 overflow-hidden">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold font-sora">Currency Converter</h3>
                            <button className="text-blue-600 font-medium text-sm">Edit</button>
                          </div>

                          {/* Main Currency Card */}
                          <div className="bg-blue-50 rounded-xl p-3 mb-4 border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <img 
                                  src="https://flagcdn.com/w40/us.png" 
                                  alt="United States" 
                                  className="w-5 h-3 rounded-sm object-cover"
                                  onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    const nextElement = target.nextElementSibling as HTMLElement;
                                    if (nextElement) nextElement.style.display = 'inline';
                                  }}
                                />
                                <span className="text-lg hidden">🇺🇸</span>
                                <span className="font-semibold text-sm">USD</span>
                              </div>
                              <span className="text-lg font-bold">1,000.00 $</span>
                            </div>
                            <p className="text-xs text-gray-600">United States Dollar</p>
                          </div>

                          {/* Conversion Results */}
                          <div className="space-y-2">
                            {[
                              { flagUrl: 'https://flagcdn.com/w40/eu.png', fallback: '🇪🇺', code: 'EUR', amount: '934.50 €', rate: '1 EUR = 1.07 USD', name: 'Euro' },
                              { flagUrl: 'https://flagcdn.com/w40/gb.png', fallback: '🇬🇧', code: 'GBP', amount: '798.20 £', rate: '1 GBP = 1.25 USD', name: 'British Pound' },
                              { flagUrl: 'https://flagcdn.com/w40/jp.png', fallback: '🇯🇵', code: 'JPY', amount: '149,800 ¥', rate: '1 JPY = 0.0067 USD', name: 'Japanese Yen' },
                              { flagUrl: 'https://flagcdn.com/w40/ca.png', fallback: '🇨🇦', code: 'CAD', amount: '1,359.00 $', rate: '1 CAD = 0.74 USD', name: 'Canadian Dollar' },
                              { flagUrl: 'https://flagcdn.com/w40/au.png', fallback: '🇦🇺', code: 'AUD', amount: '1,523.00 $', rate: '1 AUD = 0.66 USD', name: 'Australian Dollar' }
                            ].map((currency, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center gap-2">
                                  <div className="relative w-5 h-3">
                                    <img 
                                      src={currency.flagUrl} 
                                      alt={currency.name} 
                                      className="w-5 h-3 rounded-sm object-cover"
                                      onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.style.display = 'none';
                                        const nextElement = target.nextElementSibling as HTMLElement;
                                        if (nextElement) nextElement.style.display = 'inline';
                                      }}
                                    />
                                    <span className="text-sm hidden">{currency.fallback}</span>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-xs">{currency.code}</div>
                                    <div className="text-xs text-gray-500">{currency.rate}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-xs">{currency.amount}</div>
                                  <div className="text-xs text-gray-500 truncate max-w-16">{currency.name}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Section */}
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="text-gray-600">Last update</span>
                              </div>
                              <span className="font-medium">2:47:35 PM, DEC 15</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 