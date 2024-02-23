import React, { useState, useEffect } from 'react';
import './DPH.css';

function DPH(){
    const [priceWithoutVAT, setPriceWithoutVAT] = useState('');
    const [vatRate, setVATRate] = useState('');
    const [totalPriceWithVAT, setTotalPriceWithVAT] = useState('');
    const [difference, setDifference] = useState('');

    const handlePriceChange = (e) => {
        setPriceWithoutVAT(e.target.value);
    };

    const handleVATRateChange = (e) => {
        setVATRate(e.target.value);
    };

    const calculateTotalPrice = () => {
        const price = parseFloat(priceWithoutVAT);
        const rate = parseFloat(vatRate);

        if (!isNaN(price) && !isNaN(rate)) {
            const totalPrice = price * (1 + rate / 100);
            const diff = totalPrice - price;
            setTotalPriceWithVAT(totalPrice.toFixed(2));
            setDifference(diff.toFixed(2));
        } else {
            setTotalPriceWithVAT('');
            setDifference('');
        }
    };

    return (
        <div className="dph-container">
            <h2>Výpočet DPH</h2>
            <div className="dph-input">
                <label>Cena bez DPH:</label>
                <input type="number" value={priceWithoutVAT} onChange={handlePriceChange} />
            </div>
            <div className="dph-input">
                <label>Výběr sazby DPH (%):</label>
                <select value={vatRate} onChange={handleVATRateChange}>
                    <option value="">-- Vyberte sazbu DPH --</option>
                    <option value="21">21%</option>
                    <option value="15">15%</option>
                    <option value="12">12%</option>
                    <option value="10">10%</option>
                </select>
            </div>
            <button className="dph-button" onClick={calculateTotalPrice}>Vypočítat</button>
            {totalPriceWithVAT && difference && (
                <div className="dph-result">
                    <p>Celková cena s DPH: {totalPriceWithVAT} Kč</p>
                    <p>Rozdíl: {difference} Kč</p>
                </div>
            )}
        </div>
    );
}

export default DPH;
