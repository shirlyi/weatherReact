//comment form (Holds the comment form - will be a part of the comments wrapper)

import React from 'react';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitCom = this.handleSubmitCom.bind(this);
        this.state =  {name: "", txt: ""}
    }
    handleSubmitCom(){
        this.props.savecomment(this.props.index,this.state);
    }

    render() {
        return (
            <form action="#" id="getWeatherForm" onSubmit={this.handleSubmitCom}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="name"
                        required
                        // value={this.state.comment.name}
                        onChange={(event) => this.setState({ [event.target.id]: event.target.value })}/>
                        <input
                        type="text"
                        className="form-control"
                        id="txt"
                        placeholder="txt"
                        required
                        // value={this.state.comment.txt}
                        onChange={(event) => this.setState({[event.target.id]: event.target.value })}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">post!</button>
                    </span>
                </div>
            </form>
        );
    }
}
export default CommentForm;