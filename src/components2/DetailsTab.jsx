import React from 'react';

const DetailRow = ({ label, value, actionButton }) => (
  <div className="flex items-center justify-start mb-4">
    <div className="text-gray-400 text-lg mr-2">{label}:</div>
    <div className="flex items-center">
      <div className="text-gray-100 font-semibold text-lg mr-4">{value}</div>
      {actionButton}
    </div>
  </div>
);

const RecordRow = ({ recordType, value }) => (
  <tr className="hover:bg-gray-700">
    <td className="border-t border-gray-600 px-4 py-2 text-base text-gray-400">{recordType}</td>
    <td className="border-t border-gray-600 px-4 py-2 text-base font-semibold text-gray-100">{value}</td>
  </tr>
);

const DomainDetails = () => {
  // Replace the data in this object with your domain details
  const domainDetails = {
    name: 'shubh.eth',
    owner: '0x1234...',
    resolver: '0x5678...',
    content: 'Not set',
    expires: '2024-05-22',
  };

  // Replace the data in this object with your records
  const records = [
    { recordType: 'Address', value: '0x1234...' },
    { recordType: 'Content', value: 'Not set' },
  ];

  return (
    <div className=" bg-gray-700 text-gray-100 font-poppins">
      <div className="container mx-auto py-8">
        <div className="bg-gray-900 rounded-lg p-6 shadow-md mb-8">
          <DetailRow label="Owner" value={domainDetails.owner} />
          <DetailRow label="Resolver" value={domainDetails.resolver} />
          <DetailRow label="Content" value={domainDetails.content} />
          <DetailRow
            label="Expires"
            value={domainDetails.expires}
            actionButton={
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-thin py-1 px-6 rounded-lg">
                Extend
              </button>
            }
          />
        </div>
        <h2 className="text-2xl font-bold mb-6">Records</h2>
        <div className="bg-gray-900 rounded-lg shadow-md">
          <table className="w-full">
            <tbody>
              {records.map((record, index) => (
                <RecordRow key={index} recordType={record.recordType} value={record.value} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DomainDetails;
