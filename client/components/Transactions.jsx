import React, { useState, useEffect } from 'react';
import Transaction from './Transaction.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';
import { DataGrid } from '@material-ui/data-grid';
import { element } from 'prop-types';
import { Bar } from 'react-chartjs-2';

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (Object.keys(props.dbData).length === 0) {
      setCounter(counter + 1);
    } else {
      setCounter(10);
    }
  }, [props.dbData]);

  useEffect(() => {
    fetch('/test/get_transactions')
      .then((res) => res.json())
      .then((res) => {
        //gather data for the grid display
        setTransactions(
          res.transactions.map((ele) => {
            return {
              id: ele.row_id,
              account_id: ele.account_id,
              merchant_name: ele.merchant_name,
              amount: ele.amount,
              account_type: ele.account_type,
              date_of_transaction: ele.date_of_transaction,
              category: ele.category,
            };
          })
        );

        const data = res.transactions.reduce((acc, val) => {
          const type = val.category;
          if (!acc.hasOwnProperty(type)) {
            acc[type] = val.amount;
          } else {
            acc[type] += val.amount;
          }
          return acc;
        }, {});
        setTimeout(() => {
          console.log('in setTimeout');
          props.setDbData(data);
        }, 2000);
      })
      .then(() => {
        props.setBarData(props.genData());
        console.log('barData');
      })
      .catch((err) => console.log(err));
  }, [counter]);
  const columns = [
    { field: 'merchant_name', headerName: 'Transaction', width: 150 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'date_of_transaction', headerName: 'Date', width: 130 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 130 },
    { field: 'account_subtype', headerName: 'Account Type', width: 150 },
  ];
  return (
    <div className='transactions'>
      <h3>Transactions</h3>
      <div className='table' style={{ height: 800, width: '90%' }}>
        <DataGrid rows={transactions} columns={columns} pageSize={25} />
      </div>
    </div>
  );
}
