import React, { Component } from 'react';
import PropTypes from 'prop-types';// make validatins !!!

class SingleInput extends React.Component {
    render() {
        return (
            <div>
                 <label>{this.props.title}</label> 
                 <input type={this.props.inputType } 
                 placeholder={this.props.placeholder} 
                 class={this.props.class}
                 id={this.props.id} />
            </div>
             //onChange={ props.controlFunc } <== activate function (passed by props) on change event
             //value={props.content} <== get the value (passed by props) back from the state
        );
    }
}

export default SingleInput;