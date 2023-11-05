"use strict";
const ShoppingMainAbl = require("../../abl/shopping-main-abl.js");

class ShoppingMainController {
  init(ucEnv) {
    return ShoppingMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShoppingMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShoppingMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShoppingMainController();
