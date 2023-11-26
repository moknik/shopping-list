"use strict";

const ShoppingMainUseCaseError = require("./shopping-main-use-case-error.js");
const LIST_ERROR_PREFIX = `${ShoppingMainUseCaseError.ERROR_PREFIX}list/`;

const Create = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/create/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

const Get = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/get/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  NoListFound: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}noListFound`;
      this.message = "List does not exist or you do not have permission.";
    }
  },


};

const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/delete/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/update/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};


const List = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/list/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDoesNotExist: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}listDoesNotExist`;
      this.message = "Lists does not exists or user does not have permission to see any.";
    }
  }

};

const CreateItem = {
  UC_CODE: `${LIST_ERROR_PREFIX}item/create`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

const UpdateItem = {
  UC_CODE: `${LIST_ERROR_PREFIX}item/update/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

const DeleteItem = {
  UC_CODE: `${LIST_ERROR_PREFIX}item/delete/`,
  InvalidDtoIn: class extends ShoppingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

module.exports = {
  DeleteItem,
  UpdateItem,
  CreateItem,
  List,
  Update,
  Delete,
  Get,
  Create
};
