import React, { createContext, useContext, useState } from 'react';

const AccountBalanceContext = createContext();

export const useAccountBalance = () => useContext(AccountBalanceContext);

export const AccountBalanceProvider = ({ children }) => {
    const [accountBalance, setAccountBalance] = useState(0);

    return (
        <AccountBalanceContext.Provider value={{ accountBalance, setAccountBalance }}>
            {children}
        </AccountBalanceContext.Provider>
    );
};
