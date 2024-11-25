import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RadialMenu } from './RadialNav/RadialMenu';
import { Footer } from './Footer';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const printingImages = [
  "/images/printing/printing-1.PNG",
  "/images/printing/printing-2.PNG",
  "/images/printing/printing-3.PNG"
];

const cncImages = [
  "/images/cnc/cnc-1.png",
  "/images/cnc/cnc-2.png",
  "/images/cnc/cnc-3.png"
];

const backgroundVideos = [
  {
    webm: "/videos/3d-printing-bg.webm",
    mp4: "/videos/3d-printing-bg.mp4",
    poster: "/images/printing/printing-1.PNG"
  },
  {
    webm: "/videos/cnc-machining-bg.webm",
    mp4: "/videos/cnc-machining-bg.mp4",
    poster: "/images/cnc/cnc-1.png"
  }
];

function ImageCarousel({ images, onNavigate }: { images: string[], onNavigate: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full h-64 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Service ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={prevImage}
              className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors transform hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors transform hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % backgroundVideos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background Videos */}
      <div className="fixed inset-0 z-0">
        {backgroundVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === activeVideo ? 0.5 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            <video
              key={video.mp4}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={video.mp4} type="video/mp4" />
              <source src={video.webm} type="video/webm" />
              <img src={video.poster} alt="Background" className="w-full h-full object-cover" />
            </video>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <RadialMenu />

      {/* Main Content */}
      <div className="relative z-10 flex-grow">
        {/* Compact Header Section */}
        <div className="flex flex-col items-center pt-6 pb-4 px-4">
          {/* Company Name with Logo */}
          <div className="w-full max-w-7xl flex items-center justify-start px-4">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Black Arrow Forge" className="h-6 w-auto mr-2" />
              <h2 className="text-lg font-bold text-white">Black Arrow Forge</h2>
            </div>
          </div>

          {/* Enhanced Tagline with metallic glow effect */}
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-white drop-shadow-[0_0_25px_rgba(255,87,36,0.3)] [text-shadow:_0_1px_20px_rgb(255_255_255_/_20%)]">
              Forge the Future,
              <br />
              One Part at a Time
            </span>
          </motion.h1>
        </div>

        {/* Service Panels */}
        <div className="w-full px-4 pb-12">
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* 3D Printing Panel */}
            <motion.div
              className="w-full md:w-[450px] bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,87,36,0.2)] hover:shadow-[0_0_25px_rgba(255,87,36,0.4)] transition-shadow group"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/instant-quote')}
            >
              <ImageCarousel images={printingImages} onNavigate={() => navigate('/instant-quote')} />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">3D Printing</h3>
                <p className="mt-2 text-gray-400 text-sm md:text-base">
                  Rapid prototyping and small batch production with quick turnaround times.
                </p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-full hover:from-orange-700 hover:to-red-800 transition-all text-sm md:text-base flex items-center">
                  Get Instant 3D Print Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* CNC Machining Panel */}
            <motion.div
              className="w-full md:w-[450px] bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,87,36,0.2)] hover:shadow-[0_0_25px_rgba(255,87,36,0.4)] transition-shadow group"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/quote')}
            >
              <ImageCarousel images={cncImages} onNavigate={() => navigate('/quote')} />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">CNC Machining</h3>
                <p className="mt-2 text-gray-400 text-sm md:text-base">
                  Precision parts with tight tolerances in aluminum, steel, and other metals.
                </p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-full hover:from-orange-700 hover:to-red-800 transition-all text-sm md:text-base flex items-center">
                  Quote CNC Parts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}