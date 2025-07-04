const mongoose= require('mongoose');

const questionSchema = new mongoose.Schema({
session:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Session"}
,questions:{
    type:String,
},
answer:{
    type:String,
}
,
note:{
    type:String,
},
isPinned:{
    type:Boolean,
    default:false   

}
},{
    timestamps:true
})

export const  Question=  mongoose.model("Question",questionSchema);