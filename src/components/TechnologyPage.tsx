import React from 'react';
import { RadialMenu } from './RadialNav/RadialMenu';

export function TechnologyPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <RadialMenu />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">Our Technology</h1>

        {/* 3D Printing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">3D Printing Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Materials</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• PLA - Biodegradable and ideal for prototypes</li>
                <li>• ABS - Durable and heat-resistant</li>
                <li>• PETG - Strong and chemical resistant</li>
                <li>• Nylon - Flexible and wear-resistant</li>
                <li>• TPU - Elastic and impact resistant</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Printers</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Prusa i3 MK3S+ - High precision and reliability</li>
                <li>• Ultimaker S5 - Large format professional printing</li>
                <li>• Form 3+ - SLA resin printing for fine detail</li>
                <li>• BCN3D Sigma D25 - IDEX system for dual material</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CNC Machining Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">CNC Machining Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Materials</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Aluminum 6061, 7075</li>
                <li>• Stainless Steel 303, 304, 316</li>
                <li>• Tool Steel</li>
                <li>• Brass and Bronze</li>
                <li>• Engineering Plastics (Delrin, PEEK, etc.)</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Machines</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Haas VF-2SS - High-speed vertical machining</li>
                <li>• DMG MORI NLX 2500 - CNC turning center</li>
                <li>• Mazak VARIAXIS i-600 - 5-axis machining</li>
                <li>• FANUC RoboDrill - High precision milling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Tolerances</h3>
              <p className="text-gray-300">
                Our advanced machinery and skilled technicians can achieve tolerances down to ±0.001" for CNC machining
                and layer heights as low as 0.05mm for 3D printing.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Finishing</h3>
              <p className="text-gray-300">
                We offer various finishing options including bead blasting, anodizing, powder coating, and post-processing
                for 3D printed parts to achieve your desired surface finish.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quality Control</h3>
              <p className="text-gray-300">
                Every part is inspected using our CMM machines and advanced scanning equipment to ensure it meets your
                specifications and our quality standards.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}