import React, { useState } from 'react';
import './Invest.css';
function Invest() {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyDeposit, setMonthlyDeposit] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [investmentDuration, setInvestmentDuration] = useState('');
    const [futureValue, setFutureValue] = useState(null);
    const [earnings, setEarnings] = useState(null);

    const calculateFutureValue = () => {
        const principal = parseFloat(initialAmount);
        const monthlyRate = parseFloat(annualInterestRate) / 12 / 100;
        const months = parseInt(investmentDuration) * 12;
        const totalMonthlyDeposit = parseFloat(monthlyDeposit) * months;
        const totalCosts = principal + totalMonthlyDeposit;
    
        let futureVal = principal;
    
        for (let i = 0; i < months; i++) {
            futureVal = (futureVal + parseFloat(monthlyDeposit)) * (1 + monthlyRate);
        }
    
        setFutureValue(futureVal.toFixed(2));
        const futureEarn = futureVal - totalCosts;
        setEarnings(futureEarn.toFixed(2));
    };
    

    return (
        <div className="invest-container">
            <h2>Kalkulačka investic</h2>
            <div>
                <label>Vkladová částka (Kč):</label>
                <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} />
            </div>
            <div>
                <label>Měsíční vklad (Kč):</label>
                <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(e.target.value)} />
            </div>
            <div>
                <label>Roční zhodnocení (%):</label>
                <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)} />
            </div>
            <div>
                <label>Čas trvání (roky):</label>
                <input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(e.target.value)} />
            </div>
            <button onClick={calculateFutureValue}>Calculate</button>

            <div className="result">
                <h3>Odahovaná celková hodnota:</h3>
                <p>{futureValue}</p>
                <h3>Výdělek:</h3>
                <p>{earnings}</p>
            </div>
        </div>
    );
}

export default Invest;
