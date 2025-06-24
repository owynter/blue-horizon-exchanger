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

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-white to-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-white to-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sora">
            Start Making Smarter
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Financial Decisions Today
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto font-inter leading-relaxed">
            Join over 5,000+ users who rely on Blue Horizon for accurate financial calculations. 
            Start with our comprehensive currency converter and discover the difference precision makes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/currency-converter">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg font-inter shadow-lg hover:shadow-xl transition-all duration-200">
                Try Currency Converter Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-blue-200 text-blue-100 hover:bg-blue-800/50 font-inter px-8 py-4 text-lg backdrop-blur-sm"
            >
              View All Features
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-blue-500/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-sora">170+</div>
              <div className="text-blue-200 text-sm font-inter">Currencies Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-sora">Real-time</div>
              <div className="text-blue-200 text-sm font-inter">Exchange Rates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-sora">5K+</div>
              <div className="text-blue-200 text-sm font-inter">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-sora">Free</div>
              <div className="text-blue-200 text-sm font-inter">Always & Forever</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 