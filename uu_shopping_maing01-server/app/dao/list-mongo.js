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
    let filter = { id: dtoIn.dtoIn.id, awid: dtoIn.dtoIn.awid, owner: dtoIn.user };
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
    const listId = dtoIn.dtoIn.listId;

    const itemId = typeof dtoIn.dtoIn.itemId === 'string' ? new ObjectId(dtoIn.dtoIn.itemId) : dtoIn.dtoIn.itemId;

    let filter = {
      id: listId,
      awid: dtoIn.dtoIn.awid,
      $or: [
        { owner: user },
        { members: { $in: [user] } }
      ]
    };
    return await super.findOneAndUpdate(
      filter,
      { $pull: { items: { id: itemId } } },
      "NONE"
    );
  }

  async itemUpdate(dtoIn) {
    const user = dtoIn.user;
    const listId = dtoIn.dtoIn.listId;
    const itemId = typeof dtoIn.dtoIn.itemId === 'string' ? new ObjectId(dtoIn.dtoIn.itemId) : dtoIn.dtoIn.itemId;

    let updateData = {};
    if (dtoIn.dtoIn.name) {
      updateData['items.$.name'] = dtoIn.dtoIn.name;
    }
    if (dtoIn.dtoIn.quantity) {
      updateData['items.$.quantity'] = dtoIn.dtoIn.quantity;
    }
    if (dtoIn.dtoIn.resolved !== undefined) {
      updateData['items.$.resolved'] = dtoIn.dtoIn.resolved;
    }

    let filter = {
      id: listId,
      awid: dtoIn.dtoIn.awid,
      $or: [
        { owner: user },
        { members: { $in: [user] } }
      ],
      'items.id': itemId
    };

    return await super.findOneAndUpdate(
      filter,
      { $set: updateData },
      "NONE"
    );
  }






}

module.exports = ListMongo;
