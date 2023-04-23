import React, { useState } from 'react';

const RegisterTab = () => {
  const [duration, setDuration] = useState(1);

  const handleDurationIncrease = () => {
    setDuration(prevDuration => prevDuration + 1);
  };

  const handleDurationDecrease = () => {
    setDuration(prevDuration => (prevDuration > 1 ? prevDuration - 1 : prevDuration));
  };

  return (
    <div className="flex flex-col space-y-5 bg-gray-900 p-4 rounded-lg">
      <div className="relative">
        <input
          type="number"
          className="block w-full px-4 py-3 rounded-lg bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-3xl text-gray-100 placeholder-transparent placeholder-opacity-50"
          placeholder="Duration"
          value={duration}
          onChange={event => setDuration(Number(event.target.value))}
          min={1}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            className="inline-flex justify-center items-center w-10 h-10 text-gray-400 hover:text-gray-500"
            onClick={handleDurationIncrease}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

          </button>
          <button
            type="button"
            className="inline-flex justify-center items-center w-10 h-10 text-gray-400 hover:text-gray-500"
            onClick={handleDurationDecrease}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

          </button>
        </div>
      </div>
      <div className="text-gray-400 text-sm">
        <p>Minimum duration: 1 day</p>
      </div>
      <div className="relative">
        <input
          type="number"
          className="block w-full px-4 py-3 rounded-lg bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-3xl text-gray-100 placeholder-transparent placeholder-opacity-50"
          placeholder="Amount"
          min={0}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <span className="text-lg font-medium text-gray-500"></span>
        </div>
      </div>
      <div className='block text-center'>
      <button type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
      </div>
    </div>
  );
};

export default RegisterTab;
