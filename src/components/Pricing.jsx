import React from 'react';

const Pricing = () => {
  const checkMark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 inline-block mr-2 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8.267 13.454l7.11-7.667C16.308 4.534 17.727 3.9 19 5.174l-9.363 9.13c-.724.705-1.905.705-2.63 0l-6.27-6.083c-1.274-1.274-.365-3.092 1.455-2.647l7.075 7.88z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center font-mono transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Plan 1 */}
          <div className="text-center p-6 bg-opacity-50 bg-gray-800 rounded-lg shadow-md backdrop-blur-md transition-all duration-500 ease-in-out transform hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-4 font-mono">Basic</h3>
            <p className="font-mono text-4xl mb-6">$5/mo</p>
            <ul className="font-mono mb-6">
              <li>{checkMark}1 Domain</li>
              <li>{checkMark}Basic Support</li>
              <li>{checkMark}Custom Configuration</li>
            </ul>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Get Started
            </button>
          </div>
          {/* Plan 2 */}
          <div className="text-center p-6 bg-opacity-50 bg-blue-500 rounded-lg shadow-md backdrop-blur-md transition-all duration-500 ease-in-out transform hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-4 font-mono">Pro</h3>
            <p className="font-mono text-4xl mb-6">$15/mo</p>
            <ul className="font-mono mb-6">
              <li>{checkMark}5 Domains</li>
              <li>{checkMark}Priority Support</li>
              <li>{checkMark}Advanced Configuration</li>
            </ul>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Get Started
            </button>
          </div>
                      {/* Plan 3 */}
                      <div className="text-center p-6 bg-opacity-50 bg-gray-800 rounded-lg shadow-md backdrop-blur-md transition-all duration-500 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 font-mono">Business</h3>
              <p className="font-mono text-4xl mb-6">$50/mo</p>
              <ul className="font-mono mb-6">
                <li>{checkMark}20 Domains</li>
                <li>{checkMark}24/7 Support</li>
                <li>{checkMark}Custom Analytics</li>
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Get Started
              </button>
            </div>
            {/* Plan 4 */}
            <div className="text-center p-6 bg-opacity-50 bg-gray-800 rounded-lg shadow-md backdrop-blur-md transition-all duration-500 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 font-mono">Enterprise</h3>
              <p className="font-mono text-4xl mb-6">$100/mo</p>
              <ul className="font-mono mb-6">
                <li>{checkMark}Unlimited Domains</li>
                <li>{checkMark}Dedicated Support</li>
                <li>{checkMark}Custom Solutions</li>
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Pricing;

