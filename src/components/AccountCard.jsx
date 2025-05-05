const AccountCard = ({ account, onClick }) => {
    return (
      <div 
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
        <p className="text-2xl font-bold mt-2 text-gray-900">${account.balance}</p>
        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
            {account.type}
          </span>
        </div>
      </div>
    );
  };
  
  export default AccountCard;