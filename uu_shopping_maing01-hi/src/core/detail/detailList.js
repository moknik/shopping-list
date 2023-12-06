//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useBackground, lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "../../routes/config/config.js";
import ItemList from "./itemList.js";
import Title from "./title.js";
import UserList from "./userlist.js";
import { useState } from "react";

const TESTING_USER_LIST = [
  { name: "Tomáš Blažek", id: "9957-2503-7732-0000" },
  { name: "John Doe", id: "9957-2635-6563" },
  { name: "Mary", id: "9957-2503-7732-0003" },
  { name: "Lucy", id: "9957-2503-7732-003" },
  { name: "Tom", id: 5 },
  { name: "Bob", id: 6 }]

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
      margin: "auto",
    }),
};

//@@viewOff:css

let DetailList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const background = useBackground();
    //console.log(param1);
    console.log("propsDetal", props);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [userList, setUserList] = useState(TESTING_USER_LIST);

    const owner = (() => {
      const session = useSession().identity.uuIdentity;
      const owner = props.data.data.owner;
      const isAuthorized = session === owner;

      return { isAuthorized };
    })();


    const user = (() => {
      const session = useSession().identity.uuIdentity;
      let isAuthorized = false;
      for (const user of props.data.data.user) {
        if (user.includes(session)) {
          isAuthorized = true;
          break;
        }
      }
      return { isAuthorized };
    })();

    if (owner.isAuthorized || user.isAuthorized)
      return (
        <div {...attrs}>
          <Uu5Elements.Link href="home" >
            <Uu5Elements.Button size="xl" icon="uugds-home" onClick={(true)} />

          </Uu5Elements.Link>

          <Title data={props.data} authenticated={owner.isAuthorized} />
          <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            backgroundColor: background === "dark" ? "#9c9c9c" : "#f5f5f5",
            borderRadius: "0 0 50px 50px",
          }}>
            <ItemList itemList={props.data.data} />
            <UserList userList={userList} shoppingList={props.data.data} authenticated={owner.isAuthorized} />
          </div>
        </div>

      );
    else return (
      <>
        <Uu5Elements.Alert header="Forbidden access" priority="error" />
        <Uu5Elements.Link href="home" >
          <Uu5Elements.Button size="xl" icon="uugds-home" onClick={(true)} />
        </Uu5Elements.Link>
      </>
    )
    //@@viewOff:render
  },
});

DetailList = withRoute(DetailList, { authenticated: true });

//@@viewOn:exports
export { DetailList };
export default DetailList;
//@@viewOff:exports
