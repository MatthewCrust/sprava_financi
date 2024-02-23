import React, { createContext, useContext, useState } from 'react';

const AllTransactionsContext = createContext();

export const useAllTransactions = () => useContext(AllTransactionsContext);

export const AllTransactionsProvider = ({ children }) => {
    const [allTransactionsList, setAllTransactionsList] = useState([]);

    return (
        <AllTransactionsContext.Provider value={{ allTransactionsList, setAllTransactionsList }}>
            {children}
        </AllTransactionsContext.Provider>
    );
};
