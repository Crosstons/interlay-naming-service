import React, { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import DomainBlock from './DomainBlock';
import RegisterTab from './RegisterTab';
import SubdomainsTab from './SubdomainsTab';

const DomainTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tabNumber) => {
    setIsLoading(true);
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust the timeout duration as needed
    }
  }, [isLoading]);

  return (
    <div className="bg-gray-700 text-gray-100 font-poppins">
      <div className="container mx-auto py-8">
        <div className="flex mb-4">
          <button
            className={`w-1/3 py-2 text-center ${
              activeTab === 1 ? 'bg-blue-600' : 'bg-gray-900'
            } hover:bg-blue-600`}
            onClick={() => handleTabClick(1)}
          >
            Register
          </button>
          <button
            className={`w-1/3 py-2 text-center ${
              activeTab === 2 ? 'bg-blue-600' : 'bg-gray-900'
            } hover:bg-blue-600`}
            onClick={() => handleTabClick(2)}
          >
            Domain Details
          </button>
          <button
            className={`w-1/3 py-2 text-center ${
              activeTab === 3 ? 'bg-blue-600' : 'bg-gray-900'
            } hover:bg-blue-600`}
            onClick={() => handleTabClick(2)}
          >
            Subdomains
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
          {isLoading ? (
            <div className="flex justify-center">
              <BounceLoader color={'#60A5FA'} />
            </div>
          ) : (
            <div>
              {activeTab === 1 && <RegisterTab />}
              {activeTab === 2 && <DomainBlock />}              
              {activeTab === 3 && <SubdomainsTab />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainTabs;
