var React=require('react');
var createReactClass=require('create-react-class');
require('./css/todoItem.css');

//create another component: TodoItem component
var TodoItem=createReactClass({
    render:function () {

        console.log(this.props.item.name)
        return(
            <li>
                <div className="todo-item">
                    <span className="item-name">{this.props.item.name}</span>
                    <span className="item-delete" onClick={this.handleDelete}>Add to chart</span>
                </div>
            </li>
        )
    },
    //this function need to be in this class, because we called this.handleDelete in render
    handleDelete:function () {
        this.props.onDelete(this.props.item)
    }
});

module.exports=TodoItem;