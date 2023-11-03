"use strict";
const ShoppingAbl = require("../../abl/shopping-abl.js");

class ShoppingController {
  init(ucEnv) {
    return ShoppingAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShoppingAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShoppingAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShoppingController();
