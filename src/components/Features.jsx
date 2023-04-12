import React, { useEffect, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { FaRocket, FaLock, FaCode } from 'react-icons/fa';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState([false, false, false]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const featuresElement = document.getElementById('features');
    const featuresPosition = featuresElement.getBoundingClientRect().top;
    if (featuresPosition <= windowHeight * 0.8) {
      setIsVisible([true, true, true]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="features" className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center font-mono">
          Explore Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Feature 1 */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <ScrollAnimation animateIn="fadeInUp" duration={1} easing="ease-out" animateOnce={true}>
              <FaRocket className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-4 font-mono">Feature 1</h3>
              <p className="text-lg font-mono">
                Dummy feature description. Elaborate on the benefits and how it
                can improve the user experience.
              </p>
            </ScrollAnimation>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <ScrollAnimation animateIn="fadeInUp" duration={1} delay={200} easing="ease-out" animateOnce={true}>
              <FaLock className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-4 font-mono">Feature 2</h3>
              <p className="text-lg font-mono">
                Dummy feature description. Elaborate on the benefits and how it
                can improve the user experience.
              </p>
            </ScrollAnimation>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <ScrollAnimation animateIn="fadeInUp" duration={1} delay={400} easing="ease-out" animateOnce={true}>
              <FaCode className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-4 font-mono">Feature 3</h3>
              <p className="text-lg font-mono">
                Dummy feature description. Elaborate on the benefits and how it
                can improve the user experience.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
