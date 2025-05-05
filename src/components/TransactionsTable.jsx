import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TransactionsTable = ({ accountId, accountName }) => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', accountId],
    queryFn: () => 
      axios.get(`https://6810b5e927f2fdac24127ce7.mockapi.io/transactions?accountid=${accountId}`)
        .then(res => res.data),
  });

  if (isLoading) return <div className="text-center py-8">Loading transactions...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading transactions: {error.message}</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Transactions for {accountName}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium   'text-green-600' : 'text-red-600'   }`}>
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;