import React, { useState, useEffect, useCallback } from 'react';

const FashionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Sample slide data
  const slides = [
    {
      id: 1,
      title: "Choose your Perfect",
      subtitle: "Fashion Fit",
      highlight: "Now on Sale!",
      buttonText: "Shop Now",
      bgColor: "from-slate-800 to-slate-900",
      textColor: "text-cyan-400",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Summer Collection",
      subtitle: "2024 Trends",
      highlight: "Up to 50% Off!",
      buttonText: "Explore",
      bgColor: "from-pink-900 to-purple-900",
      textColor: "text-pink-300",
      images: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Luxury Wear",
      highlight: "New Arrivals!",
      buttonText: "Discover",
      bgColor: "from-emerald-900 to-teal-900",
      textColor: "text-emerald-300",
      images: [
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Casual Comfort",
      subtitle: "Everyday Style",
      highlight: "Free Shipping!",
      buttonText: "Shop Collection",
      bgColor: "from-orange-900 to-red-900",
      textColor: "text-orange-300",
      images: [
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=400&h=300&fit=crop"
      ]
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlay]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Pause autoplay on interaction
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  }, [slides.length, pauseAutoPlay]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  }, [slides.length, pauseAutoPlay]);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="relative w-full min-h-[500px] sm:min-h-[500px] md:min-h-[600px] lg:h-[700px] xl:h-[800px] overflow-hidden bg-gray-900 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Slider Container */}
      <div className="relative w-full h-full">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.bgColor} transition-all duration-1000 ease-in-out`} />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full">
          {/* Left Content Section */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-4 lg:pt-0 pb-4">
            <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ${currentSlideData.textColor} mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight transition-all duration-500`}>
                {currentSlideData.title}
              </h1>
              <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${currentSlideData.textColor} mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight transition-all duration-500`}>
                {currentSlideData.subtitle}
              </h2>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ${currentSlideData.textColor} mb-3 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-500`}>
                {currentSlideData.highlight}
              </p>
              
              <button className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                {currentSlideData.buttonText}
              </button>
            </div>
            
            {/* Dot Indicators */}
            <div className="flex justify-center lg:justify-start space-x-2 sm:space-x-3 mt-4 sm:mt-6 md:mt-8 lg:mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-orange-400 scale-125'
                      : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Images Section */}
          <div className="flex-1 relative p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8">
            {/* Mobile layout - single column */}
            <div className="flex flex-col gap-3 md:hidden h-full">
              <div className="relative overflow-hidden rounded-md shadow-xl h-[200px] sm:h-[250px]">
                <img
                  src={currentSlideData.images[0]}
                  alt="Fashion model"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex gap-3">
                <div className="relative overflow-hidden rounded-md shadow-lg flex-1 h-[120px] sm:h-[150px]">
                  <img
                    src={currentSlideData.images[1]}
                    alt="Fashion accessory"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative overflow-hidden rounded-md shadow-lg flex-1 h-[120px] sm:h-[150px]">
                  <img
                    src={currentSlideData.images[2]}
                    alt="Fashion item"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Desktop layout - grid */}
            <div className="hidden md:grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 lg:gap-4 h-full">
              {/* Main large image */}
              <div className="row-span-2 relative overflow-hidden rounded-md sm:rounded-lg shadow-xl sm:shadow-2xl">
                <img
                  src={currentSlideData.images[0]}
                  alt="Fashion model"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Top right image */}
              <div className="relative overflow-hidden rounded-md sm:rounded-lg shadow-lg sm:shadow-xl">
                <img
                  src={currentSlideData.images[1]}
                  alt="Fashion accessory"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Bottom right image */}
              <div className="relative overflow-hidden rounded-md sm:rounded-lg shadow-lg sm:shadow-xl">
                <img
                  src={currentSlideData.images[2]}
                  alt="Fashion item"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-20 hidden sm:block"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-20 hidden sm:block"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Touch/Swipe Areas for Mobile */}
        <div className="absolute inset-0 flex sm:hidden z-20">
          <button
            onClick={prevSlide}
            className="flex-1 bg-transparent"
            aria-label="Previous slide"
          />
          <button
            onClick={nextSlide}
            className="flex-1 bg-transparent"
            aria-label="Next slide"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 z-20">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default FashionSlider;