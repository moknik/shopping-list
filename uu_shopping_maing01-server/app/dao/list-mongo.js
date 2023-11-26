"use strict";
const { ObjectId } = require('mongodb');

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1, id: 1}, {unique: true});
  }

  async create(list) {
    return await super.insertOne(list.dtoIn);
  }

  async delete(dtoIn) {
    await super.deleteOne({id: dtoIn.dtoIn.id, awid: dtoIn.dtoIn.awid, owner: dtoIn.dtoIn.user});
  }

  async update(dtoIn) {
    let filter = { id: dtoIn.dtoIn.id, awid: dtoIn.dtoIn.awid, owner: dtoIn.dtoIn.user };
    return await super.findOneAndUpdate(filter, dtoIn.dtoIn, "NONE");
  }

  async get(dtoIn) {
    const user = dtoIn.dtoIn.user;

    var output = await super.findOne({id: dtoIn.dtoIn.id, awid: dtoIn.dtoIn.awid,  $or: [
      { owner: user },
      { members: { $in: [user] } }
    ]});

    return output;
  }

  async list(dtoIn) {
    const awid = dtoIn.dtoIn.awid;
    const pageInfo = dtoIn.pageInfo;
    const user = dtoIn.dtoIn.user;

    var filter = {
      awid,
      $or: [
        { owner: user },
        { members: { $in: [user] } }
      ]
    };
    if (dtoIn.dtoIn.archive != null) {
       filter = {
        awid,
        archive: dtoIn.dtoIn.archive,
        $or: [
          { owner: user },
          { members: { $in: [user] } }
        ]
      };
    }

    return await super.find(filter, pageInfo);
  }
  async itemCreate(dtoIn) {
    const user = dtoIn.dtoIn.user;

    let filter = { id: dtoIn.dtoIn.listId, awid: dtoIn.dtoIn.awid, $or: [
      { owner: user },
      { members: { $in: [user] } }
    ] };
    const itemName = dtoIn.dtoIn.name;
    var itemQuantity = dtoIn.dtoIn.quantity??=1;
    var resolved = dtoIn.dtoIn.resolved??=false;
    const itemID = new ObjectId();
    return await super.findOneAndUpdate(filter, { $push: { items: { id: itemID, name: itemName, quantity: itemQuantity, resolved } } }, "NONE");
  }

  async itemDelete(dtoIn) {
    const user = dtoIn.dtoIn.user;

    let filter = { id: dtoIn.dtoIn.listId, awid: dtoIn.dtoIn.awid, $or: [
      { owner: user },
      { members: { $in: [user] } }
    ] };
    const itemID = dtoIn.dtoIn.itemId;
    return await super.findOneAndUpdate(filter, { $pull: { items: { id: itemID} } }, "NONE");
  }



  async itemUpdate(dtoIn) {
    const user = dtoIn.dtoIn.user;

    let filter = {
      id: dtoIn.dtoIn.listId,
      awid: dtoIn.dtoIn.awid,
      $or: [
        { owner: user },
        { members: { $in: [user] } }
      ]
    };

    var itemID = typeof dtoIn.dtoIn.itemId === 'string' ? new ObjectId(dtoIn.dtoIn.itemId) : dtoIn.dtoIn.itemId;

    const itemName = dtoIn.dtoIn.name;
    const itemQuantity = dtoIn.dtoIn.quantity;
    const resolved = dtoIn.dtoIn.resolved;

    const update = {
      $set: {
        "items.$[elem].name": itemName,
        "items.$[elem].quantity": itemQuantity,
        "items.$[elem].resolved": resolved
      }
    };

    const options = {
      arrayFilters: [{ "elem.id": itemID }]
    };

    let doc = await super.findOne(filter);
    console.log(doc);

    return await super.findOneAndUpdate(filter, update, options);
  }



}

module.exports = ListMongo;
