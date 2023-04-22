import React from 'react'
import FixedSearchBar from '../components2/FixedSearchBar';
import DomainBlock from '../components2/DomainBlock';
import DetailsTab from '../components2/DetailsTab';

    const handleSearchSubmit = (searchValue) => {
      console.log('Search:', searchValue);
        };


function Dashboard() {
  return (
    <div className="bg-gray-800 h-screen">
      <FixedSearchBar onSubmit={handleSearchSubmit} />
      <div className="container mx-auto pt-40">
        <DomainBlock onSubmit={handleSearchSubmit} />
      </div>
    </div>
  )
}

export default Dashboard