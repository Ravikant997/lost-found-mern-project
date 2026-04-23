const Item = require('../models/Item');

exports.createItem = async(req,res)=>{
 const item = await Item.create({...req.body, user:req.user.id});
 res.json(item);
};

exports.getItems = async(req,res)=>{
 const items = await Item.find();
 res.json(items);
};

exports.getItemById = async(req,res)=>{
 const item = await Item.findById(req.params.id);
 res.json(item);
};

exports.updateItem = async(req,res)=>{
 const item = await Item.findById(req.params.id);
 if(item.user.toString() !== req.user.id) return res.status(403).json({msg:"Unauthorized"});
 const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
 res.json(updated);
};

exports.deleteItem = async(req,res)=>{
 const item = await Item.findById(req.params.id);
 if(item.user.toString() !== req.user.id) return res.status(403).json({msg:"Unauthorized"});
 await Item.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};

exports.searchItem = async(req,res)=>{
 const {name} = req.query;
 const items = await Item.find({itemName: new RegExp(name,'i')});
 res.json(items);
};