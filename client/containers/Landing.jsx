import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Connect from '../components/NavBar.jsx';
import AccountInfo from '../components/AccountInfo.jsx';
import NavBar from '../components/NavBar.jsx';
import DisplayData from '../components/DisplayData.jsx';
import Transactions from '../components/Transactions.jsx';
import '../styles.scss';

const accounts = [
  {
    account_id: 'yBDqZZbGZ5HX7GBrw654cpDGKWlP4ztyw43j8',
    account_subtype: 'checking',
    account_name: 'Plaid Gold Standard 0% Interest Checking',
    acount_balance: 100,
  },
  {
    account_id: '9B5rggwqgKHnekAZP8D4fPExkdlAryuRg4GAo',
    account_subtype: 'savings',
    account_name: 'Plaid Silver Standard 0.1% Interest Saving',
    acount_balance: 200,
  },
  {
    account_id: 'vK3X77RE7AuXymK3vlqxc4ZEWeabgMFW1qzNe',
    account_subtype: 'cd',
    account_name: 'Plaid Bronze Standard 0.2% Interest CD',
    acount_balance: null,
  },
  {
    account_id: 'nWbE33JZ3wH6XP8Jv1EeU7xjAADvybF6QAerl',
    account_subtype: 'credit card',
    account_name: 'Plaid Diamond 12.5% APR Interest Credit Card',
    acount_balance: null,
  },
  {
    account_id: 'b7wE99jB9gH3ZlQ8VozXC9rZBBV687sV7mxap',
    account_subtype: 'money market',
    account_name: 'Plaid Platinum Standard 1.85% Interest Money Market',
    acount_balance: 43200,
  },
];

function Landing() {
  function handleChange(newValue) {
    setValue(newValue);
  }
  const [dbData, setDbData] = useState({});
  const genData = () => {
    console.log('dbData', dbData);
    const categories =
      Object.keys(dbData).length === 0 ? null : Object.keys(dbData);
    const values =
      Object.keys(dbData).length === 0 ? null : Object.values(dbData);
    return {
      labels: categories,
      datasets: [
        {
          label: 'Scale',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const [barData, setBarData] = useState(genData());
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className='landing'>
      <div className='leftSide'>
        <NavBar accounts={accounts} onChange={handleChange} />
      </div>
      <div className='rightSide'>
        <AccountInfo accounts={accounts} />
        <DisplayData 
          barData={barData} 
          options={options}/>
        <Transactions
          setBarData={setBarData}
          dbData={dbData}
          setDbData={setDbData}
          genData={genData}
        />
      </div>
    </div>
  );
}

export default Landing;
