import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import RegisterTab from './RegisterTab';
import DetailsTab from './DetailsTab';
import SubdomainsTab from './SubdomainsTab';

const DomainInfo = () => {
  const [activeTab, setActiveTab] = useState('register');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'register':
        return <RegisterTab />;
      case 'details':
        return <DetailsTab />;
      case 'subdomains':
        return <SubdomainsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-700 text-white pb-10 mt-4 poppins rounded">
      <div className="container mx-auto px-4 ">
        <div className="flex items-center pt-4">
          {/* Domain Name */}
          <div className="flex-shrink-0">
            <h2 className="text-4xl font-bold">vrjdesai.eth</h2>
          </div>
          {/* Copy Icon */}
          <div className="ml-2">
            <button
              className="text-2xl focus:outline-none hover:text-blue-500 transition duration-300"
              onClick={() => {
                // Handle copy logic here
              }}
            >
              <FiCopy />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex-grow">
            <ul className="flex justify-end space-x-1">
              {['register', 'details', 'subdomains'].map((tab, index) => (
                <li key={index} className="relative">
                  {index !== 0 && (
                    <div className="absolute inset-y-0 left-0 w-px bg-white opacity-30" />
                  )}
                  <a
                    href={`#${tab}`}
                    className={`px-8 py-2 text-lg  transition duration-300 rounded ${
                      activeTab === tab ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-600'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick(tab);
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
         {/* Tab content */}
         <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DomainInfo;