import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TransactionsTable from './TransactionsTable';
import AccountCard from './AccountCard';

const Dashboard = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const { data: accounts, isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => axios.get('https://6810b5e927f2fdac24127ce7.mockapi.io/accounts').then(res => res.data),
  });

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
  };

  const handleBackClick = () => {
    setSelectedAccount(null);
  };

  if (isLoading) return <div className="text-center py-8">Loading accounts...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading accounts: {error.message}</div>;

  return (
    <div>
      {selectedAccount ? (
        <div>
          <button 
            onClick={handleBackClick}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Accounts
          </button>
          <TransactionsTable accountId={selectedAccount.id} accountName={selectedAccount.name} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dashtext ">
          {accounts.map(account => (
            <AccountCard 
              key={account.id} 
              account={account} 
              onClick={() => handleAccountClick(account)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;