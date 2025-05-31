const mongoose=require('mongoose');

const newsSchema=new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String},
    description:{type:String,required:true},
    date:{type:Date,default:Date.now},
});

module.exports=mongoose.model('News',newsSchema);