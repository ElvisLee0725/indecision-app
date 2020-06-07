import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.state = {
            options: [],
            selectedOption: undefined
        }
    }
    componentDidMount() {
        try {
            const options = JSON.parse(localStorage.getItem('options'));
            if(options) {
                this.setState(() => ({ options })); 
            }
        }
        catch(e) {
            // Do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options));
        }
    }
    handlePick() {
        const index = Math.floor(Math.random() * this.state.options.length);
        this.setState(() => ({
            selectedOption: this.state.options[index]
        }));
    }
    handleCloseModal() {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(option) {
        this.setState((prevState) => ({
                options: prevState.options.filter((opt) => opt !== option)
        }));
    }
    handleAddOption(option) {
        if(!option) {
            return 'Please enter a valid option';
        }
        else if(this.state.options.indexOf(option) > -1) {
            return 'This is already in your list';
        }

        this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
        
    }
    render() {
        const subtitle = 'Put your life to an app';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
                    <div className="widget">
                        <Options 
                        handleDeleteOptions={this.handleDeleteOptions} 
                        handleDeleteOption={this.handleDeleteOption}
                        options={this.state.options}/>
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
                
                <OptionModal selectedOption={this.state.selectedOption} handleCloseModal={this.handleCloseModal}/>
            </div>
        );
    }
}