"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/list-error.js");
const Warnings = require("../api/warnings/list-warning.js");


class ListAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("list");
  }

  async deleteItem(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("itemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

   //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    dtoIn.archive = false;
    dtoIn.user = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.itemDelete({ dtoIn });
    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;

  }

  async updateItem(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    dtoIn.archive = false;
    var user = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.itemUpdate({ dtoIn, user });
    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

  async createItem(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    dtoIn.archive = false;
    dtoIn.user = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.itemCreate({ dtoIn });
    const dtoOut = { ...list, uuAppErrorMap };

    return dtoOut;
  }

  async list(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("listDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    dtoIn.user = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.list({ dtoIn });

    if (list == null) {
      throw new Errors.List.NoListFound();
    }
    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }


  async update(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

   const validationResult = this.validator.validate("updateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    var user = uuIdentity;
    dtoIn.awid = awid;
    const test = await this.dao.get({ dtoIn });
    if (test == null) {
      throw new Errors.Update.NoListFound();
    }
    const list = await this.dao.update({ dtoIn, user});

    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

  async delete(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

   const validationResult = this.validator.validate("deleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    dtoIn.user = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.delete({ dtoIn});

    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;


  }

  async get(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("getDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    dtoIn.user = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.get({ dtoIn });

    if (list == null) {
      throw new Errors.Get.NoListFound();
    }
    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

  async create(awid, dtoIn, uuIdentity) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("createDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //return {...dtoIn, uuAppErrorMap }; //DÚ 3 - jednotlivé end-pointy (uuCmd) budou ve výstupních datech vracet přijatá vstupní data a informace o chybách

    dtoIn.archive = false;
    dtoIn.owner = uuIdentity;
    dtoIn.awid = awid;
    const list = await this.dao.create({ dtoIn });
    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

}

module.exports = new ListAbl();
