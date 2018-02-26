var React=require('react');
var createReactClass=require('create-react-class');

require('./css/addItem.css')

//The component for donating one book, contains an input field to take the bookname, and a "submit" type input as a button
var AddItem=createReactClass({
    render:function () {
        return(
            <form id="add-book" onSubmit={this.handleSubmit}>
                <input type="text" required ref="newItem"/>
                <input type="submit" value="Donate One Book!"/>
            </form>
        );
    },

    //when submitted, call the onAdd function in index.js
    handleSubmit:function (e) {
        e.preventDefault();
        console.log('item is '+this.refs.newItem.value);
        this.props.onAdd(this.refs.newItem.value);
    }
})

module.exports=AddItem;
