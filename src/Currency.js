import currencyapi from '@everapi/currencyapi-js';
import React, { useState, useEffect } from 'react';
import './Currency.css';
function Currency() {
    const client = new currencyapi('cur_live_Yf8YbRQtxNmKDuUglCXsH21NkvnnoFJ6I3qzUn7r');

    const [baseBalance, setBaseBalance] = useState('');
    const [convertedBalance, setConvertedBalance] = useState(null);
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [baseCurrency, setBaseCurrency] = useState('CZK');

    useEffect(() => {
        if (baseBalance === '') return;

        client.latest({
            base_currency: baseCurrency,
            currencies: targetCurrency
        }).then(response => {
            if (response.meta && response.meta.last_updated_at && response.data && response.data[targetCurrency]) {
                const conversionRate = response.data[targetCurrency].value;
                const convertedAmount = parseFloat(baseBalance) * conversionRate;
                setConvertedBalance(convertedAmount);
            } else {
                console.error('Invalid API response format');
                setConvertedBalance(null);
            }
        }).catch(error => {
            console.error('Error fetching conversion rate:', error);
            setConvertedBalance(null);
        });
    }, [baseBalance, baseCurrency, targetCurrency]);

    return (
    <div className="currency-container">
        <h3>Převod měny</h3>
        <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            <option value="CZK">České koruna</option>
            <option value="USD">US dollar</option>
            <option value="EUR">Euro</option>
            <option value="JPY">Japanese yen</option>
            <option value="GBP">Pound sterling</option>
            <option value="AED">United Arab Emirates dirham</option>
            <option value="AFN">Afghan afghani</option>

        </select>
        <input placeholder="Původní měna" type="number" value={baseBalance} onChange={(e) => setBaseBalance(e.target.value)} />
        <input type="number" value={convertedBalance !== null ? convertedBalance.toFixed(2) : 'Loading...'} readOnly />
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="USD">US dollar</option>
            <option value="EUR">Euro</option>
            <option value="JPY">Japanese yen</option>
            <option value="GBP">Pound sterling</option>
            <option value="AED">United Arab Emirates dirham</option>
            <option value="AFN">Afghan afghani</option>
        </select>
    </div>
    );
}

export default Currency;
