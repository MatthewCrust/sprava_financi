import React, { useState, useEffect } from 'react';
import './AccountDisplay.css';
import TransactionList from './TransactionList';
import { useAccountBalance } from './AccountBalanceContext';
function AccountDisplay(){
    const { accountBalance, setAccountBalance } = useAccountBalance();
    

    return(

        <div className='account-main-box'>
            
            <div className='account-box-loses'>
                <TransactionList transactionType="lose"/>
            </div>

            <div className='account-box-balance'>
                <p className='balance-show'>{accountBalance/*convertedBalance != null ? convertedBalance.toFixed(2) : 'Loading...'*/} Kč</p>
            </div>

            <div className='account-box-gain'>
                <TransactionList transactionType="gain"/>
            </div>
        </div>
        
    );
}

export default AccountDisplay;
