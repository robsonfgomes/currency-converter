import React, { Component } from 'react'
import './Converter.css'
import { format } from 'money-formatter'
import { Dropdown, Input } from 'semantic-ui-react'

// import { Container } from './styles';

export default class Converter extends Component {

    constructor(props){
        super(props);

        this.state = {
            currencyA_value: '',
            currencyB_value: '',
            currencyA: "BRL",
            currencyB: "USD",
        }

        this.handleInput = this.handleInput.bind(this);
        this.conversionA = this.conversionA.bind(this);
        this.conversionB = this.conversionB.bind(this);
        this.findCurrency = this.findCurrency.bind(this);
        
        this.currencies = [
            { key: 'BRL', value: 'BRL', text: 'BRL - Brazilian Real' },
            { key: 'USD', value: 'USD', text: 'USD - United States Dollar' },
        ]       
        this.getCurrencies(this);        
    }

    getCurrencies(){        
        let url = "https://free.currconv.com/api/v7/currencies?apiKey=e43e4224c7e0c8c97258";
        fetch(url)
        .then(res=>{
            return res.json()
        })
        .then(json=>{                        
            for(let i in json.results) {    
                if(json.results[i].id !== 'BRL' && json.results[i].id !== 'USD'){                                     
                    this.currencies.push({ 
                        key: json.results[i].id,
                        value: json.results[i].id,
                        text: `${json.results[i].id} - ${json.results[i].currencyName}` 
                    })
                }
            }
        })
    }

    conversionA(from, to){                       
        if(this.state.currencyA_value != ''){                       
            let from_to = `${from}_${to}`;
            let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=y&apiKey=e43e4224c7e0c8c97258`;            
            fetch(url)
            .then(res=>{
                return res.json()
            })
            .then(json=>{
                let cotation = json[from_to].val
                let currencyB_value = parseFloat(this.state.currencyA_value) * cotation
                //currencyB_value = format(this.state.currencyB, Math.round((parseFloat(currencyB_value) + Number.EPSILON) * 100) / 100)//Arred            
                currencyB_value = (this.state.currencyB, Math.round((parseFloat(currencyB_value) + Number.EPSILON) * 100) / 100)//Arred            
                this.setState({ currencyB_value })            
            })
        }
    }

    conversionB(from, to){                
        if(this.state.currencyB_value != ''){
            let from_to = `${from}_${to}`;
            let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=y&apiKey=e43e4224c7e0c8c97258`;

            fetch(url)
            .then(res=>{
                return res.json()
            })
            .then(json=>{                
                let cotation = json[from_to].val
                let currencyA_value = parseFloat(this.state.currencyB_value) * cotation
                //currencyB_value = format(this.state.currencyB, Math.round((parseFloat(currencyB_value) + Number.EPSILON) * 100) / 100)//Arred            
                currencyA_value = (this.state.currencyA, Math.round((parseFloat(currencyA_value) + Number.EPSILON) * 100) / 100)//Arred            
                this.setState({ currencyA_value })            
            })
        }
    }

    handleInput(e, { name, value }){        
        //this.setState({[e.target.name]: e.target.value})        
        this.setState({ [name]: value })           
        if([name] == 'currencyA_value'){            
            this.conversionA(this.state.currencyA, this.state.currencyB);
        } else if([name] == 'currencyB_value') {            
            this.conversionB(this.state.currencyB, this.state.currencyA);
        } else if([name] == 'currencyA') {            
            this.conversionA(value, this.state.currencyB);
        } else if([name] == 'currencyB') {            
            this.conversionB(value, this.state.currencyA);
        }
    }

    findCurrency(e){
        this.setState({currencyB_value: e.target.value});
    }

    render() {
        return (  
            // <div className="converter">
            //     <h2>{this.props.currencyA} for {this.props.currencyB}</h2>
            //     <input type="text" onChange={(event)=>{this.setState({currencyA_value:event.target.value})}}></input>
            //     <button className="btn btn-primary" type="button" onClick={this.conversion}>Convert</button>

            // <h2>{this.state.currencyB_value}</h2>
            // </div>
            <div className="ui container">
                <div className="ui grid">
                    <div className="one column row">
                        <div className="column">
                            <br/>
                            <Input
                                className="currencyInput"
                                type='number'                            
                                label={<Dropdown 
                                    className="currencySelected" 
                                    defaultValue='BRL' 
                                    search selection 
                                    options={this.currencies}
                                    name='currencyA'
                                    onChange={this.handleInput} />}
                                labelPosition='right'
                                placeholder='You send'
                                focus                                
                                size='big'
                                name='currencyA_value'
                                onChange={this.handleInput}
                                value={this.state.currencyA_value}
                            /> 
                        </div>           
                    </div>                    
                    <div className="one column row">
                        <div className="column">
                            <br/>
                            <Input          
                                className="currencyInput" 
                                type='number'                 
                                label={<Dropdown 
                                    className="currencySelected"
                                    defaultValue='USD' 
                                    search selection 
                                    options={this.currencies}
                                    name='currencyB'
                                    onChange={this.handleInput} />}
                                labelPosition='right'
                                placeholder='Beneficiary receives'
                                size='big'
                                name='currencyB_value'
                                onChange={this.handleInput}
                                value={this.state.currencyB_value}
                            /> 
                        </div>           
                    </div>
                </div>
            </div>
        );
    }
}
