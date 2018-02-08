//comments component (Holds the seperate comment)

import React from 'react';
import CommentBox from './CommentBox';
// if the only thing that we need to do in a componnet is just return to render than it should be  afunction not a class
const CommentsListBox = (props) => {
    //no need to use this in arrow function
    return (
        <div>
            {props.comments.map((item, index) => {
                return (<CommentBox key={item._id} item={item} commentIndex={item._id} cityIndex={props.cityIndex} deleteComment={props.deleteComment} />)
            })}
        </div>
    )
}


export default CommentsListBox;