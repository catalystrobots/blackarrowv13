import React from 'react';
import { RadialMenu } from './RadialNav/RadialMenu';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <RadialMenu />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">About Black Arrow Forge</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-gray-300">
                Founded in 2020, Black Arrow Forge emerged from a passion for precision manufacturing
                and a vision to make advanced manufacturing technologies accessible to innovators,
                engineers, and businesses of all sizes. What started as a small workshop has grown
                into a full-service manufacturing facility equipped with the latest in CNC and
                additive manufacturing technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300">
                We're committed to empowering the next generation of engineers and innovators by
                providing access to cutting-edge manufacturing capabilities. Our mission is to bridge
                the gap between ideas and reality, offering rapid prototyping and production services
                that help bring innovations to life.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Core Values</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Precision in every part we produce</li>
                <li>• Innovation in our processes and solutions</li>
                <li>• Reliability in meeting deadlines and specifications</li>
                <li>• Sustainability in our manufacturing practices</li>
                <li>• Excellence in customer service</li>
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
              <p className="text-gray-300">
                Our team consists of experienced engineers, skilled machinists, and additive
                manufacturing specialists who bring decades of combined experience to every project.
                We're passionate about manufacturing and committed to delivering exceptional results
                for our clients.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Quality Commitment</h2>
              <p className="text-gray-300">
                At Black Arrow Forge, quality isn't just a buzzword—it's built into everything we do.
                From material selection to final inspection, we maintain rigorous quality control
                standards to ensure every part meets or exceeds specifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Sustainability</h2>
              <p className="text-gray-300">
                We're committed to sustainable manufacturing practices. Our additive manufacturing
                processes minimize waste, and we recycle materials whenever possible. We're
                constantly exploring new ways to reduce our environmental impact while maintaining
                the highest quality standards.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}