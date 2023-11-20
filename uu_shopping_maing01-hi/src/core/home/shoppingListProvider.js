import { createComponent, useDataList } from "uu5g05";
import Calls from "calls";
import config from "../../config/config.js";
import Uu5Elements from "uu5g05-elements";
import ShoppingListView from "./shoppingListView.js";

const ShoppingListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: config.TAG + "ShoppingListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const dataList = useDataList({
      handlerMap: {
        load: Calls.loadShoppingList,
        create: Calls.createShoppingList,
      },
      itemHandlerMap: {
        delete: Calls.deleteShoppingList,
        archive: Calls.archiveShoppingList,
        leave: Calls.leaveShoppingList,
      },
    })
    //console.log("datalist", dataList);

    let result;
    switch (dataList.state) {
      case "pendingNoData":
        result = <Uu5Elements.Pending size="max" />;

        break;

      case "errorNoData":
        result = <Uu5Elements.Alert header="Data about shopping lists cannot be loaded" priority="error" />;

        break;
      case "error":
        result = <Uu5Elements.Alert header="Cannot create new shopping list" priority="error" />;

        break;
      default:
        result = <ShoppingListView data={dataList.data} onCreate={dataList.handlerMap.create} />;

        break;
    }
    //@@viewOn:render
    return result;

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListProvider };
