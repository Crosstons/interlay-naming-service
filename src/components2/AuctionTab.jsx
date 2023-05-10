import React from 'react';
import { FiCopy } from 'react-icons/fi';

const AuctionTab = () => {
  const domains = [
    { name: 'example1.eth', currentBid: 500, wallet: '0xAbcD1234eFgh5678IjKl9mN0PQrStu12' },
    { name: 'example2.eth', currentBid: 300, wallet: '0xAbcD1234eFgh5678IjKl9mN0PQrStu12' },
    { name: 'example3.eth', currentBid: 1000, wallet: '0xAbcD1234eFgh5678IjKl9mN0PQrStu12' },
  ];

  const handlePlaceBid = (domain) => {
    // Handle placing a bid on the specified domain
    console.log(`Placing a bid on ${domain.name}`);
  };

  const handleGenerateNewAuction = () => {
    // Handle generating a new auction
    console.log('Generating a new auction');
  };

  const handleCopyAddress = (address) => {
    // Handle copying the address to the clipboard
    console.log(`Copying address: ${address}`);
  };

  return (
    <div className="poppins">
      <ul>
        {domains.map((domain, index) => (
          <li key={index} className="flex items-center justify-between py-4 space-x-4 border-b border-white">
            <div className="w-16 h-16 bg-gray-500 rounded-full" />
            <div className="flex-grow flex flex-col items-start space-y-2">
              <div className="text-2xl font-semibold">{domain.name}</div>
              <div className="text-base font-medium text-gray-400">
                Current Bid: <span className="text-lg text-white">{domain.currentBid} ETH</span>
              </div>
              <button
                className="px-4 py-1 text-base font-bold text-blue-600 bg-white rounded hover:bg-blue-600 hover:text-white transition duration-300"
                onClick={() => handlePlaceBid(domain)}
              >
                Place Bid
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-400">{domain.wallet.slice(0, 10)}...{domain.wallet.slice(-4)}</div>
              <button
                className="text-xl focus:outline-none hover:text-blue-500 transition duration-300"
                onClick={() => handleCopyAddress(domain.wallet)}
              >
                <FiCopy />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          className="px-8 py-2 text-lg font-bold bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
          onClick={handleGenerateNewAuction}
        >
          Generate New Auction
        </button>
      </div>
    </div>
  );
};

export default AuctionTab;
