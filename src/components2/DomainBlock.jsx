import React, { useState, useEffect, useContext } from 'react';
import {
  web3Enable,
  isWeb3Injected,
  web3Accounts,
  web3FromSource
} from '@polkadot/extension-dapp'
import { ApiPromise, Keyring } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import ABI from '../artifacts/naming_service.json';
import { FiCopy } from 'react-icons/fi';
import { BounceLoader } from 'react-spinners';
import RegisterTab from './RegisterTab';
import DetailsTab from './DetailsTab';
import SubdomainsTab from './SubdomainsTab';
import AuctionTab from './AuctionTab'; // Import the new AuctionTab component
import { ApiContext } from '../context/ApiContext.tsx';

const address = 'Z9jLENBXPWo44DjgHYrdhgni4N6nmDRaN8xHkbixepRfEnA';

const DomainInfo = ({name}) => {

  const { api, apiReady } = useContext(ApiContext);
  const [activeTab, setActiveTab] = useState('register');
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({address : ""});
  const [contract, setContract] = useState();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const connectWalletHandler = async () => {
    setError('')
    setSuccessMsg('')
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }
    const extensions = await web3Enable('KNS')
    /* check if wallet is installed */
    if (extensions.length === 0) {
      setError('The user does not have any Substrate wallet installed')
      return
    }
    // set the first wallet as the signer (we assume there is only one wallet)
    api.setSigner(extensions[0].signer)
    const injectedAccounts = await web3Accounts()
    if (injectedAccounts.length > 0) {
      setAccounts(injectedAccounts);
      setAccount(injectedAccounts[0]);
    }
    const abi = new Abi(ABI, api.registry.getChainProperties())
    const contract = new ContractPromise(api, abi, address)
    setContract(contract)
    console.log(contract);
  }

  const getGasLimit = (api) =>
  api.registry.createType(
    'WeightV2',
    api.consts.system.blockWeights['maxBlock']
  )

  const getDomainInfo = async () => {
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }

    if (!account) {
      setError('Account not initialized')
      return
    }

    if (!contract) {
      setError('Contract not initialized')
      return
    }

    const gasLimit = getGasLimit(api)

    const { gasRequired, result, output } = await contract.query.getDomainInfo(
      account.address,
      {
        gasLimit,
      },
      "monu.kbtc"
    )
    console.log('gasRequired', gasRequired.toString())
    console.log('result', result.toHuman())
    console.log('output', output?.toHuman())

    if (result.isErr) {
      setError(result.asErr.toString())
      return
    }
  }

  const handleTabClick = (tabName) => {
    setIsLoading(true);
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
      case 'auction': // Add a new case for the 'auction' tab
        return <AuctionTab />;
      default:
        return null;
    }
  };

  useEffect(() => {
    (async () => {
      await connectWalletHandler();
      await getDomainInfo();
    })();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <div className="bg-gray-700 text-white pb-10 mt-4 poppins rounded">
      <div className="container mx-auto px-4">
        <div className="flex items-center pt-4">
          {/* Domain Name */}
          <button className="flex-shrink-0">
            <h2 className="text-4xl font-bold">{name}</h2>
          </button>
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
              {['register', 'details', 'subdomains', 'auction'].map((tab, index) => (
                <li key={index} className="relative">
                  {index !== 0 && (
                    <div className="absolute inset-y-0 left-0 w-px bg-white opacity-30" />
                  )}
                  <a
                    href={`#${tab}`}
                    className={`px-8 py-2 text-lg transition duration-300 rounded ${
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
          {isLoading ? (
            <div className="flex justify-center">
              <BounceLoader color={'#60A5FA'} />
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainInfo;
