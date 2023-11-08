//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import ItemList from "../core/detail/itemList.js";
import Title from "../core/detail/title.js";
import UserList from "../core/detail/userlist.js";
import { useState } from "react";

const TESTING_SHOPPING_LIST = {
  id: Utils.String.generateId(),
  name: "Fruit List",
  archived: false,
  owner: true ,
  ownerName: "John Connor",
ItemList: [{ name: "apple", amount: 5, id: Utils.String.generateId(), resolved: false },
{ name: "banana", amount: 3, id: Utils.String.generateId(), resolved: false },
{ name: "orange", amount: 7, id: Utils.String.generateId(), resolved: true },
{ name: "pear", amount: 2, id: Utils.String.generateId(), resolved: false },
{ name: "pineapple", amount: 1, id: Utils.String.generateId(), resolved: true }],

userList: [1,2,3]

}
const TESTING_USER_LIST = [
  { name: "John", id: 1},
  { name: "Peter", id: 2},
  { name: "Mary", id: 3},
  { name: "Lucy", id: 4 },
  { name: "Tom", id: 5},
  { name: "Bob", id: 6}]



//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
      margin: "auto",
      backgroundColor: "#2194f3"


    }),


};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [shoppingList, setShoppingList] = useState(TESTING_SHOPPING_LIST);
    const [userList, setUserList] = useState(TESTING_USER_LIST);
    return (
      <div {...attrs}>
         <Title shoppingList={shoppingList}  />
        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
          borderRadius: "0 0 50px 50px",
        }}>
           <ItemList shoppingList={shoppingList}/>


          <UserList userList={userList} shoppingList={shoppingList} />
        </div>


      </div>



    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
