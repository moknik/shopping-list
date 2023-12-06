import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }


const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },
  loadShoppingDetail(dtoIn) {
    //console.log("call detail", dtoIn);
    const commandUri = Calls.getCommandUri("detail/" + dtoIn);
    return Calls.call("get", commandUri);
  },
  loadShoppingList(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/list");
    return Calls.call("get", commandUri);
  },
  createShoppingList(dtoIn) {
    console.log("call create", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/create");
    return Calls.call("post", commandUri);
  },
  deleteShoppingList(dtoIn) {
    console.log("call delete", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/delete");
    return Calls.call("post", commandUri);
  },
  updateShoppingList(dtoIn) {
    console.log("call update", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/update");
    return Calls.call("post", commandUri);
  },
  archiveShoppingList(dtoIn) {
    console.log("call archive", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/archive");
    return Calls.call("post", commandUri);
  },
  leaveShoppingList(dtoIn) {
    console.log("call leave", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/leave");
    return Calls.call("post", commandUri);
  },
  createItem(dtoIn) {
    console.log("call create item", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/createItem");
    return Calls.call("post", commandUri);
  }
  ,
  updateItem(dtoIn) {
    console.log("call update item", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/updateItem");
    return Calls.call("post", commandUri);
  },
  deleteItem(dtoIn) {
    console.log("call delete item", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/deleteItem");
    return Calls.call("post", commandUri);
  },
  resolveItem(dtoIn) {
    console.log("call resolve item", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/resolveItem");
    return Calls.call("post", commandUri);
  }
  ,
  updateUserList(dtoIn) {
    console.log("call update user list", dtoIn);
    const commandUri = Calls.getCommandUri("shoppingList/updateUserList");
    return Calls.call("post", commandUri);
  },


  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
