import React, { useState } from 'react';

const HeroSection = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search logic here
    console.log('Search:', search);
  };

  return (
    <div className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="md:flex md:items-center md:justify-between">
          {/* Heading and description */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              Interlay Naming Service
            </h1>
            <p className="text-lg mb-8 font-mono">
              Decentralized domain names for your blockchain project. Secure,
              censorship-resistant, and easily accessible.
            </p>
            {/* Search bar */}
            <form onSubmit={handleSearchSubmit} className="flex w-full mb-8">
              <input
                type="text"
                placeholder="Search for your domain"
                className="w-full px-4 py-3 rounded-l-lg focus:outline-none bg-gray-900 shadow-md"
                value={search}
                onChange={handleSearchChange}
              />
              <button className="bg-blue-500 text-white px-8 py-3 rounded-r-lg font-mono transition duration-300 ease-in-out hover:bg-blue-600">
                Search
              </button>
            </form>
            {/* Domain suggestions */}
            <div className="text-center md:text-left text-sm space-x-4">
              <span>.crypto</span>
              <span className="mx-2 italic font-semibold text-gray-400">|</span>
              <span>.nft</span>
              <span className="mx-2 italic font-semibold text-gray-400">|</span>
              <span>.blockchain</span>
              {/* Add more domain suggestions here */}
            </div>
          </div>
          {/* Illustration */}
          <div className="hidden md:block md:w-1/2 m-10">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA6lBMVEVkhZYAAACui2Hw8PAyjv39MzOgsbnGxsYfKzAqKipMOyhpipz6+vq4lGlLS0taeYm+oYMSFxqef1iOclCDm6ejtLz18+5Il/z7SUvu9vY6TFZAQEDPz88sOEAhISFlh5hSbXviWiZcgJNpj59IXmt8Y0X+9+57sPknif2bwPbx3+D+ICFlUDg3LCAeGBH///+MjIzgZjgnDwdoaGijo6OCNRhFHgruXymEtvf6P0AAAAQMEA4QFxwbIiVBVmQcHBwgGBQxJhUVDABnYFlYVVKmt711dXVOSEBLGgKzimQ/OS9ASVJxXkMnNTq13h3MAAADmklEQVR4nO3dDVPaMACAYZlO0coQUTd1EAbidH7NzX0IOve9uc3//3c2jyZ0tNS2NE0M73vn6Z1cyXPRC7SlnZkhIiIiIiIiIiIiIqLpS0yaZ1pwV/3aRF3UGrYTS5PW6JgmxCUQIkRoPISJhHauFsKT5TCHgw11rJKK1pZMjbR/5ddPJ7xUmzKtCiS8nfBIm4t+zVTA3vBH06xgUcKrbMJAplXBECJEaD53hcL/nuNqESUU0c9eQKIq+xAe3+RzqLZujCg65fCwpGsx5UuZuHaMvYDzECJEiBBh5vzlSRQvLGhhFHI/Q2HrYUfuIymGKKplWS88mr4sP2DpUj5fUXupqjkOPl1lhAgRIkSIECFChAgRIkSIECFChAgRIkSIEKFO4XFX9tlR4VFF9tFZ4QO/Y4QIESJEmFH4SQnv4Xq4/ShBX1ZkX5M8PKJG+EwFT+vnTobChZPlJG0OSvTYiE7WRehsk/n1Qd/W2nqFs0W0PK8UEijm/dbXNABNClUIESKcIuGy+0K/0UFt3H7FpB64GdOGBUL5uZjm95NR4+77x2Ob25eDf3H+ZGznNsyh6nVY+Hxvblx7+7tSePBwbAcIESJEiNA54eja75pw+6XMVeEwhAgRIkSIEGFA6Nh7/FGhM/tpYuYwxxAiRIhwOoQ914XBSyvMqsP2kxU8jm+D8Gi17reSX+pcjFb4ahiF/x8uqXNmckxtPeLqLQgRIkToirDnqlDkMIeVUFYJ2zcNv3424XW9G2rVIuHtyZ1+5WzCymH4r6BulVBJXRcK54XuzyFChAinWtgeCnV8GmFiYcLi5rCgECJEiBAhwmKF4f0alaGwMzZPLz5HYeVwKZQSlhvj0zu/eQqPStna0nqrPZ3CXi/icuhOCRPPoft/pQgRIjQv7MgbetsgrMf0YztVb/1+PmrJbBDG3dXj7GmqTt/5vZEb6OuYxLTCuKu3nC2k6vTZoKGwhhAhQoQI3RDmuh6OCm1YD69XY/rVTNPlK9nvtrxbqQXCf8axv5l4L4Ydr0tj4r0FQoQIESJMUPfQb3i4YitJEZ/FsFSojjh1ldBLkt5br+o4fhgQah17shAiRGg+hFMjjHtrH+7PRe22i1rfNG8mqbBeSlVjcDBJ91qeLE1C06xACBEiNB/CDMKe88JS6cbYyaQRpRXutBJUNa0KllZY9cTdmUb9V2qh6QGnDiFC+0OI0P4QIrQ/hAjtDyFC+7s/wr+GG6DXPBA4jgAAAABJRU5ErkJggg=="
              alt="Illustration"
              className="mx-auto w-full h-auto animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
