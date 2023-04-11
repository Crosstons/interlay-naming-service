import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../HeroSection.css"

const HeroSection = () => {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    setShowHero(true);
  }, []);

  return (
    <CSSTransition in={showHero} timeout={500} classNames="fade">
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-mono mb-6">
            Polkadot Naming Service
          </h1>
          <p className="font-mono mb-6">
            A decentralized domain name service for the Polkadot ecosystem.
          </p>
          <button className="rounded-md bg-blue-500 text-white px-6 py-3 font-mono transition duration-300 ease-in-out hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </section>
    </CSSTransition>
  );
};

export default HeroSection;
