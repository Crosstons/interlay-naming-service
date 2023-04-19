import React from 'react'
import FixedSearchBar from '../components2/FixedSearchBar';

    const handleSearchSubmit = (searchValue) => {
      console.log('Search:', searchValue);
        };


function Dashboard() {
  return (
    <div>
        <FixedSearchBar onSubmit={handleSearchSubmit}/>
    </div>
  )
}

export default Dashboard