var React=require('react');
var createReactClass=require('create-react-class');
require('./css/bookItem.css');

//create a horizontal blank component to display the book name, and a add to chart to put it into the shopping chart
var bookItem=createReactClass({
    render:function () {
        return(
            <li>
                <div className="book-item">
                    <span className="item-name">{this.props.item.name}</span>
                    <span className="item-delete" onClick={this.handleDelete}>Add to chart</span>
                </div>
            </li>
        )
    },

    //the handleDelete function calls the onDelete function in index.js, using the property to call function
    handleDelete:function () {
        this.props.onDelete(this.props.item)
    }
});

module.exports=bookItem;