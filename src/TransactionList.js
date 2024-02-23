import Modal from 'react-modal';
import { useAccountBalance } from './AccountBalanceContext';
import React, { useState, useEffect } from 'react';
import TransactionComponent from './TransactionComponent';
import './TransactionList.css';
import { useAllTransactions } from './TransactionContext';

function TransactionList({ transactionType }) {
    const { accountBalance, setAccountBalance } = useAccountBalance();
    const [transactionCost, setTransactionCost] = useState(0);
    const [name, setName] = useState("");
    const [transactionCategory, setTransactionCategory] = useState("");
    const [transactionsList, setTransactionsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const { allTransactionsList, setAllTransactionsList } = useAllTransactions();


    const addTransaction = () => {
        const newTransaction = {
            id: Date.now(),
            name,
            transactionCost: transactionType === 'lose' ? -transactionCost : transactionCost,
            transactionCategory
        };
    

        setTransactionsList(prevTransactions => [...prevTransactions, newTransaction]);

        setAllTransactionsList(prevTransactions => [...prevTransactions, newTransaction]);
    
        if (transactionType === 'lose') {
            setAccountBalance(accountBalance - transactionCost);
        } else if (transactionType === 'gain') {
            setAccountBalance(accountBalance + Number(transactionCost));
        }
        console.log(allTransactionsList)
    };

    const filterTransactions = () => {
        let filteredTransactions = [...transactionsList];
        if (selectedCategory !== "") {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.transactionCategory === selectedCategory);
        }
        if (minPrice !== null && minPrice !== "") {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.transactionCost >= parseInt(minPrice));
        }
        if (maxPrice !== null && maxPrice !== "") {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.transactionCost <= parseInt(maxPrice));
        }
        return filteredTransactions;
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={`account-transaction-box`}>
             <div className="filter-options">
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Všechny kategorie</option>
                    <option value={transactionType === 'lose' ? 'Jídlo' : 'Plat'}>{transactionType === 'lose' ? 'Jídlo' : 'Plat'}</option>
                    <option value={transactionType === 'lose' ? 'Oblečení' : 'Bonus'}>{transactionType === 'lose' ? 'Oblečení' : 'Bonus'}</option>
                    <option value={transactionType === 'lose' ? 'Zábava' : 'Dar'}>{transactionType === 'lose' ? 'Zábava' : 'Dar'}</option>
                </select>
                <input placeholder="Min. cena" type="number" onChange={(e) => setMinPrice(e.target.value)} />
                <input placeholder="Max. cena" type="number" onChange={(e) => setMaxPrice(e.target.value)} />
             </div>
            <button className={transactionType === 'lose' ? 'btn btn-danger' : 'btn btn-success'} onClick={openModal}>
                {transactionType === 'lose' ? 'Vybrat peníze' : 'Vložit peníze'}
            </button>
            <div className={`list-items-${transactionType}`}>
                {filterTransactions().map(transaction => (
                    <TransactionComponent key={transaction.id} name={transaction.name} cost={transaction.transactionCost} type={transactionType} category={transaction.transactionCategory}/>
                ))}
                {!transactionsList.length && (
                    <TransactionComponent key="empty" name="Název" cost="0" category="Kategorie" type={transactionType} />
                )}
            </div>

            <Modal className={"modal-custom-style"} isOpen={isModalOpen} onRequestClose={closeModal}>
                <h2 id='modal-title'>
                    {transactionType === 'lose' ? 'Vybrat peníze' : 'Vložit peníze'}
                </h2>
                <div className='modal-box'>
                    <input placeholder="Zadejte název" type="text" onChange={(e) => setName(e.target.value)} />
                    <input placeholder="Zadejte požadovanou částku" type="number" onChange={(e) => setTransactionCost(e.target.value)} />
                    <select onChange={(e) => setTransactionCategory(e.target.value)}>
                        <option value="">Žádná</option>
                        <option value={transactionType === 'lose' ? 'Jídlo' : 'Plat'}>{transactionType === 'lose' ? 'Jídlo' : 'Plat'}</option>
                        <option value={transactionType === 'lose' ? 'Oblečení' : 'Bonus'}>{transactionType === 'lose' ? 'Oblečení' : 'Bonus'}</option>
                        <option value={transactionType === 'lose' ? 'Zábava' : 'Dar'}>{transactionType === 'lose' ? 'Zábava' : 'Dar'}</option>
                    </select>
                    <button className="btn btn-primary" onClick={addTransaction}>
                        {transactionType === 'lose' ? 'Vybrat peníze' : 'Vložit peníze'}
                    </button>
                    <button className="btn btn-danger" onClick={closeModal}>Zavřít</button>
                </div>
            </Modal>
        </div>
    );
}

export default TransactionList;
