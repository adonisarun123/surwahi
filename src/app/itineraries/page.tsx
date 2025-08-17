'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Plane, 
  Train, 
  Car, 
  Bus,
  Clock, 
  IndianRupee,
  Leaf,
  Download,
  Share2,
  Calendar,
  Route,
  ArrowRight
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

// Mock data - will be replaced with database queries
const majorCities = [
  { code: 'BLR', name: 'Bengaluru', airport: 'Kempegowda International', railway: 'Bengaluru City Junction' },
  { code: 'DEL', name: 'Delhi', airport: 'Indira Gandhi International', railway: 'New Delhi Railway Station' },
  { code: 'MUM', name: 'Mumbai', airport: 'Chhatrapati Shivaji International', railway: 'Mumbai Central' },
  { code: 'HYD', name: 'Hyderabad', airport: 'Rajiv Gandhi International', railway: 'Hyderabad Deccan' },
  { code: 'CCU', name: 'Kolkata', airport: 'Netaji Subhash Chandra Bose International', railway: 'Howrah Junction' },
  { code: 'MAA', name: 'Chennai', airport: 'Chennai International', railway: 'Chennai Central' }
];

const travelModes = [
  { name: 'Air + Road', icon: Plane, color: 'text-sky-500', description: 'Fastest overall journey' },
  { name: 'Rail + Road', icon: Train, color: 'text-green-600', description: 'Most eco-friendly option' },
  { name: 'Road Only', icon: Car, color: 'text-blue-600', description: 'Complete flexibility' },
  { name: 'Mixed Mode', icon: Bus, color: 'text-purple-600', description: 'Best value for money' }
];

// Sample itinerary data - would be dynamically generated
const sampleItineraries = {
  'BLR': {
    'air': {
      title: 'Bengaluru to Surwahi via Flight',
      totalDuration: '4.5 hours',
      totalCost: '₹8,500 - ₹15,000',
      co2Emissions: '145 kg CO₂',
      steps: [
        {
          mode: 'flight',
          from: 'Bengaluru (BLR)',
          to: 'Jabalpur (JLR)',
          duration: '1h 45m',
          cost: '₹6,000 - ₹12,000',
          details: ['Daily flights by IndiGo, Air India', 'Book 15+ days in advance for better rates'],
          departure: '07:30 AM',
          arrival: '09:15 AM'
        },
        {
          mode: 'road',
          from: 'Jabalpur Airport',
          to: 'Surwahi Eco-Lodge',
          duration: '1h 15m',
          cost: '₹2,500',
          details: ['Pre-arranged taxi pickup', 'Scenic route through countryside'],
          departure: '10:00 AM',
          arrival: '11:15 AM'
        }
      ]
    },
    'rail': {
      title: 'Bengaluru to Surwahi via Train',
      totalDuration: '18 hours',
      totalCost: '₹3,200 - ₹8,500',
      co2Emissions: '65 kg CO₂',
      steps: [
        {
          mode: 'train',
          from: 'Bengaluru City Junction',
          to: 'Jabalpur Junction',
          duration: '16h 40m',
          cost: '₹1,200 - ₹6,000',
          details: ['Karnataka Express (12628)', 'Departs daily at 8:40 PM'],
          departure: '08:40 PM',
          arrival: '01:20 PM+1'
        },
        {
          mode: 'road',
          from: 'Jabalpur Railway Station',
          to: 'Surwahi Eco-Lodge',
          duration: '1h 20m',
          cost: '₹2,000',
          details: ['Pre-arranged pickup available', 'Comfortable AC taxi'],
          departure: '02:00 PM',
          arrival: '03:20 PM'
        }
      ]
    }
  },
  'DEL': {
    'air': {
      title: 'Delhi to Surwahi via Flight',
      totalDuration: '4 hours',
      totalCost: '₹7,500 - ₹14,000',
      co2Emissions: '130 kg CO₂',
      steps: [
        {
          mode: 'flight',
          from: 'Delhi (DEL)',
          to: 'Jabalpur (JLR)',
          duration: '1h 30m',
          cost: '₹5,000 - ₹11,500',
          details: ['Multiple daily flights', 'IndiGo, Air India, SpiceJet'],
          departure: '08:45 AM',
          arrival: '10:15 AM'
        },
        {
          mode: 'road',
          from: 'Jabalpur Airport',
          to: 'Surwahi Eco-Lodge',
          duration: '1h 15m',
          cost: '₹2,500',
          details: ['Airport pickup service', 'Scenic forest route'],
          departure: '11:00 AM',
          arrival: '12:15 PM'
        }
      ]
    },
    'rail': {
      title: 'Delhi to Surwahi via Train',
      totalDuration: '14 hours',
      totalCost: '₹2,800 - ₹7,500',
      co2Emissions: '55 kg CO₂',
      steps: [
        {
          mode: 'train',
          from: 'New Delhi Railway Station',
          to: 'Jabalpur Junction',
          duration: '12h 30m',
          cost: '₹800 - ₹5,000',
          details: ['Shaan-e-Bhopal Express (12156)', 'Daily departure at 6:00 PM'],
          departure: '06:00 PM',
          arrival: '06:30 AM+1'
        },
        {
          mode: 'road',
          from: 'Jabalpur Railway Station',
          to: 'Surwahi Eco-Lodge',
          duration: '1h 30m',
          cost: '₹2,000',
          details: ['Early morning pickup', 'Fresh breakfast en route'],
          departure: '07:30 AM',
          arrival: '09:00 AM'
        }
      ]
    }
  }
};

export default function ItinerariesPage() {
  const [selectedCity, setSelectedCity] = useState('BLR');
  const [selectedMode, setSelectedMode] = useState('air');

  const currentItinerary = sampleItineraries[selectedCity as keyof typeof sampleItineraries]?.[selectedMode as keyof typeof sampleItineraries['BLR']];

  const handleSaveItinerary = () => {
    // TODO: Implement save functionality
    console.log('Saving itinerary...');
  };

  const handleShareItinerary = () => {
    // TODO: Implement share functionality
    console.log('Sharing itinerary...');
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log('Downloading PDF...');
  };

  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      {/* Header */}
      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
              Plan Your Journey
            </h1>
            <p className="text-body-lg text-soil-700 mb-8">
              Choose a metro, pick a mode; we&apos;ll map the calmest route. 
              Compare travel options from major Indian cities to reach Surwahi Eco-Lodge.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Planner */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* City Selection */}
            <div className="mb-8">
              <h2 className="font-display text-2xl text-forest-900 mb-6 text-center">
                Select Your Starting City
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {majorCities.map((city) => (
                  <button
                    key={city.code}
                    onClick={() => setSelectedCity(city.code)}
                    className={`p-4 rounded-card border-2 transition-all ${
                      selectedCity === city.code
                        ? 'border-moss-500 bg-moss-500/10'
                        : 'border-mist-200 hover:border-moss-500/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${
                        selectedCity === city.code ? 'text-moss-500' : 'text-forest-900'
                      }`}>
                        {city.code}
                      </div>
                      <div className="text-sm text-soil-700">{city.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Mode Selection */}
            <div className="mb-8">
              <h3 className="font-display text-xl text-forest-900 mb-4 text-center">
                Choose Travel Mode
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {travelModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <button
                      key={mode.name}
                      onClick={() => setSelectedMode(mode.name.toLowerCase().replace(' + ', '_').replace(' ', '_'))}
                      className={`p-4 rounded-card border-2 transition-all ${
                        selectedMode === mode.name.toLowerCase().replace(' + ', '_').replace(' ', '_')
                          ? 'border-moss-500 bg-moss-500/10'
                          : 'border-mist-200 hover:border-moss-500/50'
                      }`}
                    >
                      <div className="text-center">
                        <IconComponent className={`h-8 w-8 mx-auto mb-2 ${mode.color}`} />
                        <div className="font-medium text-forest-900 mb-1">{mode.name}</div>
                        <div className="text-xs text-soil-700">{mode.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Itinerary Display */}
            {currentItinerary && (
              <div className="bg-bone-0 rounded-card shadow-elev-1 overflow-hidden">
                
                {/* Header */}
                <div className="bg-sand-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl text-forest-900">
                      {currentItinerary.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveItinerary}
                        className="p-2 rounded-input border border-mist-200 hover:border-moss-500 transition-colors"
                        title="Save Itinerary"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleShareItinerary}
                        className="p-2 rounded-input border border-mist-200 hover:border-moss-500 transition-colors"
                        title="Share Itinerary"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        className="p-2 rounded-input border border-mist-200 hover:border-moss-500 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-forest-900 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Total Time</span>
                      </div>
                      <div className="text-lg font-bold text-moss-500">{currentItinerary.totalDuration}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-forest-900 mb-1">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-medium">Est. Cost</span>
                      </div>
                      <div className="text-lg font-bold text-moss-500">{currentItinerary.totalCost}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-forest-900 mb-1">
                        <Leaf className="h-4 w-4" />
                        <span className="font-medium">CO₂ Impact</span>
                      </div>
                      <div className="text-lg font-bold text-moss-500">{currentItinerary.co2Emissions}</div>
                    </div>
                  </div>
                </div>

                {/* Journey Steps */}
                <div className="p-6">
                  <h4 className="font-medium text-forest-900 mb-4">Journey Details</h4>
                  
                  <div className="space-y-6">
                    {currentItinerary.steps.map((step, index) => {
                      const isLastStep = index === currentItinerary.steps.length - 1;
                      
                      return (
                        <div key={index} className="relative">
                          <div className="flex items-start gap-4">
                            
                            {/* Mode Icon */}
                            <div className="w-12 h-12 bg-moss-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                              {step.mode === 'flight' && <Plane className="h-6 w-6 text-moss-500" />}
                              {step.mode === 'train' && <Train className="h-6 w-6 text-moss-500" />}
                              {step.mode === 'road' && <Car className="h-6 w-6 text-moss-500" />}
                              {step.mode === 'bus' && <Bus className="h-6 w-6 text-moss-500" />}
                            </div>

                            {/* Step Details */}
                            <div className="flex-1">
                              <div className="bg-sand-50 rounded-card p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium text-forest-900 capitalize">
                                    {step.mode} Journey
                                  </h5>
                                  <span className="text-sm font-medium text-moss-500">{step.cost}</span>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-3">
                                  <div>
                                    <div className="text-xs text-soil-700 mb-1">From</div>
                                    <div className="font-medium text-forest-900">{step.from}</div>
                                    <div className="text-sm text-moss-500">{step.departure}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-xs text-soil-700 mb-1">Duration</div>
                                    <div className="font-medium text-forest-900">{step.duration}</div>
                                    <Route className="h-4 w-4 text-moss-500 mx-auto mt-1" />
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-soil-700 mb-1">To</div>
                                    <div className="font-medium text-forest-900">{step.to}</div>
                                    <div className="text-sm text-moss-500">{step.arrival}</div>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  {step.details.map((detail, detailIndex) => (
                                    <div key={detailIndex} className="flex items-center gap-2 text-sm text-soil-700">
                                      <div className="w-1.5 h-1.5 bg-moss-500 rounded-full" />
                                      <span>{detail}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Connection Line */}
                          {!isLastStep && (
                            <div className="absolute left-6 top-12 w-0.5 h-6 bg-mist-200" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-sand-50 p-6 border-t border-mist-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleDownloadPDF}
                      className="btn btn-primary flex-1 justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Itinerary
                    </button>
                    <Link
                      href="/accommodations"
                      className="btn btn-secondary flex-1 justify-center"
                    >
                      Book Your Stay
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl text-forest-900 mb-4">
              Travel Tips & Information
            </h2>
            <p className="text-body-lg text-soil-700 max-w-2xl mx-auto">
              Important information to help you plan your journey to Surwahi Eco-Lodge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-bone-0 rounded-card p-6">
              <h3 className="font-medium text-forest-900 mb-3">Best Booking Time</h3>
              <ul className="space-y-2 text-sm text-soil-700">
                <li>• Flights: 15-30 days advance</li>
                <li>• Trains: 60-120 days advance</li>
                <li>• Avoid peak season (Dec-Jan)</li>
                <li>• Weekday travel is cheaper</li>
              </ul>
            </div>

            <div className="bg-bone-0 rounded-card p-6">
              <h3 className="font-medium text-forest-900 mb-3">What to Pack</h3>
              <ul className="space-y-2 text-sm text-soil-700">
                <li>• Comfortable walking shoes</li>
                <li>• Light cotton clothing</li>
                <li>• Sunscreen and hat</li>
                <li>• Insect repellent</li>
              </ul>
            </div>

            <div className="bg-bone-0 rounded-card p-6">
              <h3 className="font-medium text-forest-900 mb-3">Local Transport</h3>
              <ul className="space-y-2 text-sm text-soil-700">
                <li>• Airport/station pickup available</li>
                <li>• Advance booking recommended</li>
                <li>• Local taxis at fixed rates</li>
                <li>• Car rental available in Jabalpur</li>
              </ul>
            </div>

            <div className="bg-bone-0 rounded-card p-6">
              <h3 className="font-medium text-forest-900 mb-3">Weather Considerations</h3>
              <ul className="space-y-2 text-sm text-soil-700">
                <li>• Oct-Mar: Pleasant weather</li>
                <li>• Apr-Jun: Hot, early travel</li>
                <li>• Jul-Sep: Monsoon season</li>
                <li>• Check weather before travel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAction",
            "object": {
              "@type": "Trip",
              "name": `${majorCities.find(c => c.code === selectedCity)?.name || 'Indian City'} to Surwahi — Travel Itinerary`,
              "description": "Suggested travel routes and options to reach Surwahi Eco-Lodge",
              "itinerary": currentItinerary ? {
                "@type": "ItemList",
                "itemListElement": currentItinerary.steps.map((step, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": step.mode === 'flight' ? "Flight" : step.mode === 'train' ? "TrainTrip" : "BusTrip",
                    "departureLocation": step.from,
                    "arrivalLocation": step.to,
                    "departureTime": step.departure,
                    "arrivalTime": step.arrival
                  }
                }))
              } : undefined
            }
          })
        }}
      />
    </div>
  );
}
