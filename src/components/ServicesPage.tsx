import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const cncServices = [
  'Precision tolerances up to ±0.001"',
  'Materials: Aluminum, Steel, Titanium, Plastics',
  'Surface finishing and heat treatment',
  'Complex geometries and tight tolerances',
  'Prototype to production quantities',
  'Quality inspection reports'
];

const printingServices = [
  'Layer resolution down to 50 microns',
  'Materials: PLA, ABS, Nylon, Resin',
  'Post-processing and surface finishing',
  'Rapid prototyping services',
  'Small batch production runs',
  'Design consultation available'
];

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">Our Services</h1>
          <p className="mt-4 text-lg text-gray-300 text-center max-w-3xl mx-auto">
            Combining precision CNC machining and advanced 3D printing capabilities
            to bring your ideas to life.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* CNC Machining */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="https://images.unsplash.com/photo-1565439311799-e642315f9fe5?auto=format&fit=crop&q=80"
                alt="CNC Machining"
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900">CNC Machining</h2>
              <p className="mt-4 text-gray-600">
                Custom precision parts for every application. Our state-of-the-art CNC
                machines deliver exceptional accuracy and consistency.
              </p>
              
              <div className="mt-6 space-y-3">
                {cncServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{service}</span>
                  </div>
                ))}
              </div>

              <button
                className="mt-8 w-full bg-black text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors group"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 3D Printing */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?auto=format&fit=crop&q=80"
                alt="3D Printing"
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900">3D Printing</h2>
              <p className="mt-4 text-gray-600">
                Rapid prototyping and small-batch production made easy. Advanced 3D printing
                technology for complex geometries and quick turnaround.
              </p>
              
              <div className="mt-6 space-y-3">
                {printingServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{service}</span>
                  </div>
                ))}
              </div>

              <button
                className="mt-8 w-full bg-black text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors group"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Need a Custom Solution?
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our team of experts is ready to help you choose the right manufacturing
            process for your project. Contact us for a consultation.
          </p>
          <button className="mt-8 bg-white text-black border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors inline-flex items-center space-x-2 group">
            <span>Contact Our Team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}