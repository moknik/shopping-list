"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {

  deleteItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.deleteItem(awid, dtoIn, uuID);
  }

  updateItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.updateItem(awid, dtoIn, uuID);
  }

  createItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.createItem(awid, dtoIn, uuID);
  }

  list(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.list(awid, dtoIn, uuID);
  }

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.update(awid, dtoIn, uuID);
  }

  delete(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.delete(awid, dtoIn, uuID);
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.get(awid, dtoIn, uuID);
  }

  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    const uuID = ucEnv.getSession().getIdentity().getUuIdentity();
    return ListAbl.create(awid, dtoIn, uuID);
  }

}

module.exports = new ListController();
