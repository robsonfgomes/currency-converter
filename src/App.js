import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Converter from "./components/Converter";
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

function App() {
  return (                     
      <div className="ui container">
        <div className="ui grid">
          <div className="one column row">
            <div className="column">
              <br/>
              <h3 className="ui header">                
                <div className="content">
                  <a href="/">Currency Converter</a>
                </div>
              </h3>
              <br/>
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <h1>
                <Typist>
                  Send money fastter to the outside of your country <span>💸😍</span>
                </Typist>   
              </h1>                      
            </div>
            <div className="column">
              <Converter></Converter>  
            </div>
          </div>          
        </div>
        <div className="ui grid">
          <div className="one column row">
            <div className="column center aligned">
              <footer>
                Made with <i aria-hidden="true" className="like icon"></i> by <a href="https://github.com/robsonfgomes"  rel="noopener noreferrer" target="_blank">robsonfgomes</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
