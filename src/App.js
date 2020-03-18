import React from 'react';
import logo from './logo.svg';
import './App.css';

import Converter from "./components/Converter";

function App() {
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="line">
        <Converter currencyA="USD" currencyB="BRL"></Converter>
        <Converter currencyA="BRL" currencyB="USD"></Converter>
      </div>  
      <div className="line">
        <Converter currencyA="CAD" currencyB="BRL"></Converter>
        <Converter currencyA="BRL" currencyB="CAD"></Converter>
      </div>
      <div className="line">
        <Converter currencyA="EUR" currencyB="BRL"></Converter>
        <Converter currencyA="BRL" currencyB="EUR"></Converter>
      </div>
    </div>
  );
}

export default App;
