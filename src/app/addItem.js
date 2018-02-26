var React=require('react');
var createReactClass=require('create-react-class');

require('./css/addItem.css')

var AddItem=createReactClass({
    render:function () {
        return(
            <form id="add-todo" onSubmit={this.handleSubmit}>
                <input type="text" required ref="newItem"/>
                <input type="submit" value="Donate One Book!"/>
            </form>
        );
    },

    handleSubmit:function (e) {
        e.preventDefault();
        console.log('item is '+this.refs.newItem.value);
        this.props.onAdd(this.refs.newItem.value);
    }
})

module.exports=AddItem;
