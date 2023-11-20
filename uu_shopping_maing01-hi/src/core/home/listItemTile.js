import { createVisualComponent, Utils } from "uu5g05";
import config from "../../config/config";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import { useState } from "react";
import Config from "../config/config.js";

const ListTile = createVisualComponent({

  //@@viewOn:statics
  uu5Tag: config.TAG + "ListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const Css = {
      main: () =>
        Config.Css.css({
          padding: 32,
        }),
      button: () =>
        Config.Css.css({
          marginLeft: 10,
          marginBottom: 10,
        }),
    };
    const attrsButton = Utils.VisualComponent.getAttrs(props, Css.button());
    //console.log("props", props)
    //console.log("user", UU5.Environment.getSession().getIdentity())
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const owner = (() => {
      const session = UU5.Environment.getSession().getIdentity().uuIdentity;
      const owner = props.data.data.owner;
      const isAuthorized = session === owner;

      return { isAuthorized };
    })();

    const user = (() => {
      const session = UU5.Environment.getSession().getIdentity().uuIdentity;
      let isAuthorized = false;
      for (const user of props.data.data.user) {
        if (user.includes(session)) {
          isAuthorized = true;
          break;
        }
      }
      return { isAuthorized };
    })();

    const tileName = !owner.isAuthorized ? `${props.data.data.name} - ${props.data.data.ownerName}` : props.data.data.name;

    props.data.handlerMap.delete;
    props.data.handlerMap.archive;
    props.data.handlerMap.leave;

    //@@viewOn:render
    if (owner.isAuthorized || user.isAuthorized)
      return (

        <>
          <Uu5Elements.Block
            className={Config.Css.css({
              borderStyle: "solid",
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: "#cccccc",
            })}>
            <Uu5Elements.Link href={"detail?id=" + props.data.data.id}>
              <Uu5TilesElements.Tile header={tileName}
                onClick={() => setOpen(true)}

                className={Config.Css.css({
                  padding: 10,
                  margin: 10,
                  borderRadius: "10px",
                  backgroundColor: props.data.data.archived ? " #e6e6e6" : (owner.isAuthorized ? "#c3e2d0" : "inherit"),
                }
                )}
              >
                {!(props.data.data.id == 45) ?
                  <Uu5Elements.Block>
                    <ul>

                      {props.data.data.itemList.slice(0, 3).map((item) => (
                        <li key={item.id}>{item.amount} {item.name}</li>
                      ))}
                      {props.data.data.itemList.length > 3 && <div>...</div>}
                    </ul>
                  </Uu5Elements.Block>
                  : null}


              </Uu5TilesElements.Tile>
            </Uu5Elements.Link>
            {owner.isAuthorized ? <Uu5Elements.Button {...attrsButton} size="l" icon="uugds-delete" onClick={() => setDeleteOpen(true)}>Delete</Uu5Elements.Button>

              : null}
            {!owner.isAuthorized ? <Uu5Elements.Button {...attrsButton} size="l" icon="uugds-log-out" onClick={() => props.data.handlerMap.leave()}>Leave list</Uu5Elements.Button> : null}

            {owner.isAuthorized && !props.data.data.archived ?
              <Uu5Elements.Button {...attrsButton} size="l" icon="uugdsstencil-uiaction-archive" onClick={() => props.data.handlerMap.archive(true)}>Archive</Uu5Elements.Button>
              : null}
            {owner.isAuthorized && props.data.data.archived ?
              <Uu5Elements.Button top {...attrsButton} size="l" icon="uugds-up" onClick={() => props.data.handlerMap.archive(false)}>Activate</Uu5Elements.Button>
              : null}
          </Uu5Elements.Block>

          {owner.isAuthorized ?
            <Uu5Elements.Dialog
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              header="Are you sure you want to delete this shopping list? This action cannot be undone. "
              info={props.data.data.name}
              actionList={[{
                children: "Delete",
                icon: "mdi-delete",
                onClick: () => props.data.handlerMap.delete(),
                significance: "highlighted",
                colorScheme: "negative"
              },
              {
                children: "Cancel",
                onClick: () => setDeleteOpen(false),

              }]} />
            : null}
        </>
      );
    else return null;


    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListTile };

export default ListTile;
//@@viewOff:exports
