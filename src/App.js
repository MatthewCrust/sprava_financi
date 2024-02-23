import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import { AccountBalanceProvider } from './AccountBalanceContext';
import { AllTransactionsProvider } from './TransactionContext';
function App() {
  return (
    <AllTransactionsProvider>
      <AccountBalanceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </AccountBalanceProvider>
    </AllTransactionsProvider>

  );
}

export default App;
