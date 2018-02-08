//comment box (Holds the comment data with an option to delete)
import React, { Component } from 'react';

class CommentBox extends Component{
    render(){
        return(
            <li>written by {this.props.item.name} : {this.props.item.txt} <button className="btn" type="button" onClick={() => { this.props.deleteComment(this.props.item._id,this.props.cityIndex)}} >del</button></li> 
        )
    }
}

export default CommentBox;