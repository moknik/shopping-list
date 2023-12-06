import { createComponent, useDataList } from "uu5g05";
import Calls from "calls";
import config from "../../config/config.js";
import Uu5Elements from "uu5g05-elements";
import DetailList from "./detailList.js";

const DetailProvider = createComponent({
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
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('id');
    const dataDetail = useDataList({
      handlerMap: {
        load: () => Calls.loadShoppingDetail(param),
        create: Calls.createShoppingList,
      },
      itemHandlerMap: {
        delete: Calls.deleteShoppingList,
        archive: (isArchived) => Calls.archiveShoppingList(isArchived),
        leave: Calls.leaveShoppingList,
      },
    })
    console.log("datalist", dataDetail);

    let result;
    switch (dataDetail.state) {
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
        result = <DetailList data={dataDetail.data[0]} onCreate={dataDetail.handlerMap.create} />;

        break;
    }

    //@@viewOn:render
    return result;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailProvider };
