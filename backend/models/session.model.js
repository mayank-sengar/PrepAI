const mongoose = require('mongoose');
import { required } from '../node_modules/zod/src/v4/mini/schemas';
import { User } from './user.model';

const sessionSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
role:{
    type:"String",
    required: true,
},
experience:{
    type:"String",
    required: true,
},
topicsToFocus:{
    type:String,
    required: true,
},
description : String,
questions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question"
}]
},{
    timestamps:true
});

export const Session = mongoose.model('Session', sessionSchema);