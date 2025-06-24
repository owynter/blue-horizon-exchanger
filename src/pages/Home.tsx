import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, TrendingUp, DollarSign, PieChart, Star, Users, Zap, Grid3X3, BarChart3, CreditCard, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Grid3X3 className="h-6 w-6" />,
      title: "Currency Converter",
      description: "Convert between 170+ currencies and cryptocurrencies with real-time exchange rates and favorites system",
      status: "available" as const,
      href: "/currency-converter"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Investment Calculator",
      description: "Calculate compound interest, portfolio growth, and optimize your investment strategy over time",
      status: "coming-soon" as const
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Loan Calculator",
      description: "Analyze loan payments, interest rates, amortization schedules, and total cost of borrowing",
      status: "coming-soon" as const
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Tax Calculator",
      description: "Estimate taxes, deductions, and optimize your financial planning for maximum savings",
      status: "coming-soon" as const
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Budget Planner",
      description: "Track expenses, set financial goals, and monitor your progress towards financial freedom",
      status: "coming-soon" as const
    },
    {
      icon: <Calculator className="h-6 w-6" />,
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
            <h2 className="text-2xl font-bold text-slate-900 mb-3 font-inter leading-tight">
              Main Features
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto font-inter leading-normal">
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

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sora">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-inter">
            Join thousands of users who trust Blue Horizon for their financial calculations.
          </p>
          <Link to="/currency-converter">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 font-inter">
              Start Converting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 