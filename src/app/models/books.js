const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//the ID and available is not used now
const BookSchema=new Schema({
    name: {
        type:String
    },
    price:{
        type:Number
    },
    Category:{
        type:String
    },
    author:{
        type:String
    },
    available:{
        type: Boolean,
        default:false
    },
    ID:{
        type:Number,
    }
});

const Books=mongoose.model('book',BookSchema);
module.exports=Books;