/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


// const Images = new Mongo.Collection('Images');

var imageStore = new FS.Store.GridFS(“images”);

Images = new FS.Collection(“images”, {
 stores: [imageStore]
});

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});


Images.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'Username',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  name: {
    type: String,
    label: 'imageAI type of food',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
});

Images.attachSchema(Images.schema);

export default Images;
