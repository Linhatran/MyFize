import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const DisplayData = (props) => {
  return (
    <div className='displayData'>
      <h3>DisplayData</h3>
      <Bar data={props.barData} options={props.options} id='graph' />
    </div>
  );
};

export default DisplayData;
