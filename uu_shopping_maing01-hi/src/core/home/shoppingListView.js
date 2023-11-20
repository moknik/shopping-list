import { createVisualComponent, Utils } from "uu5g05";
import config from "../../config/config.js";
import ListTile from "./listItemTile.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { useState } from "react";
import Config from "../config/config.js";

const FILTER_DEFINITION_LIST = [
  {
    key: "archived",
    label: "Include archived",
    filter: (item, value) => {
      if (value) {

        return true;
      }
      return !item.data.archived;
    },
    inputType: "bool",

  },
  {
    key: "owner",
    label: "Only my lists",
    filter: (item, value) => {
      if (value) {
        return item.data.owner === UU5.Environment.getSession().getIdentity().uuIdentity;
      }
      return true;
    },
    inputType: "bool",
  }
]
//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
      margin: "auto",
    }),
};
//@@viewOff:css


const ShoppingListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: config.TAG + "ShoppingListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [createOpen, setCreateOpen] = useState(false);
    const [activeFilterList, setActiveFilterList] = useState([]);
    //@@viewOn:render
    return (
      <div {...attrs}>
        <Uu5Tiles.ControllerProvider
          data={props.data}
          filterDefinitionList={FILTER_DEFINITION_LIST}
          filterList={activeFilterList}
          onFilterChange={(e) => setActiveFilterList(e.data.filterList)}
        >
          <Uu5Elements.Block
            actionList={[{component: <Uu5TilesControls.FilterButton type="bar" />},
              { icon: "uugds-plus", onClick: () => setCreateOpen(true) }]}>
            <Uu5TilesControls.FilterBar
                 initialExpanded={true}
                 displayClearButton={false}
                 displayCloseButton={false}
                 displayManagerButton={false}
            />

            <Uu5TilesElements.Grid
              tileMaxWidth={400}
              tileMinWidth={200}
            >
              {ListTile}
            </Uu5TilesElements.Grid>
          </Uu5Elements.Block>
        </Uu5Tiles.ControllerProvider>

        <Uu5Forms.Form.Provider key={createOpen}
          onSubmit={async (e) => {
            await props.onCreate({ id: Utils.String.generateId(), ...e.data.value });
            setCreateOpen(false);
          }}>
          <Uu5Elements.Modal open={createOpen} onClose={() => setCreateOpen(false)} header={"Create new shopping list"}
            footer={<Uu5Forms.SubmitButton content={"Create"} colorSchema={"primary"} />
            }
          >
            <Uu5Forms.Form.View gridLayout={{ xs: "name, ownerName,  owner", s: "name, ownerName, owner" }}>
              <Uu5Forms.FormText name="name" label="Name" required />
              <Uu5Forms.FormText name="ownerName" label="Owner Name" initialValue={UU5.Environment.getSession().getIdentity().name} readOnly colorScheme="grey" />
              <Uu5Forms.FormText name="owner" label="Owner ID" initialValue={UU5.Environment.getSession().getIdentity().uuIdentity} readOnly colorScheme="grey" />
            </Uu5Forms.Form.View>
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListView };
export default ShoppingListView;


//@@viewOff:exports
