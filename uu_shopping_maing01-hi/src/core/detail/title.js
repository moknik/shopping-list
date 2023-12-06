import { useState } from "react";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";
import { useBackground } from "uu5g05";
import importLsi from "../../lsi/import-lsi.js";
import { Lsi } from "uu5g05";
import MyPieChart from "./pieChart.js";
import Calls from "../../calls.js";

function Title(props) {

  //console.log("propsTitle", props);
  const [modalOpen, setModalOpen] = useState(false);
  const [TitleList, setTitleList] = useState(props.data.data);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleSubmit(e) {
    const data = e.data.value;
    //console.log(data);
    Calls.updateShoppingList({ listID: props.data.data.id, name: data.name });
    //save  data
    setTitleList((prevTitleListOld) => {
      return {
        ...prevTitleListOld,
        name: data.name,
      };
    });
    //save new data
    setModalOpen(false);
  }

  const background = useBackground();

  const actionList = props.authenticated
    ? [{ icon: "uugds-richtext-toolbar", onClick: () => setModalOpen(true) }]
    : [];

  return (

    <Uu5Elements.Block actionList={actionList}
      className={Config.Css.css({
        width: 400, maxWidth: "100%",
        backgroundColor: background === "dark" ? "#9c9c9c" : "#f5f5f5",
        padding: 32, margin: "auto", borderRadius: "50px 50px 0 0 "
      })}    >
      <Uu5Elements.Grid >
        <h1>{TitleList.name}</h1>
        {!props.authenticated ? <h2>
          <Lsi import={importLsi} path={["ListDetail", "Owner"]} /> : {TitleList.ownerName}</h2>
          : null}
        {props.authenticated ? <Uu5Elements.Button size="l" icon="uugds-delete" onClick={() => setDeleteOpen(true)}>
          <Lsi import={importLsi} path={["ShoppingList", "Delete"]} />
        </Uu5Elements.Button>

          : null}

        {props.authenticated && !TitleList.archived ? <Uu5Elements.Button size="l" icon="uugdsstencil-uiaction-archive" onClick={() => props.data.handlerMap.archive(true)}>
          <Lsi import={importLsi} path={["ShoppingList", "Archive"]} />
        </Uu5Elements.Button>
          : null}

        {!props.authenticated ?
          <Uu5Elements.Link href="home" size="xl" >
            <Uu5Elements.Button size="l" icon="uugds-log-out" onClick={() => props.data.handlerMap.leave(false)}>
              <Lsi import={importLsi} path={["ShoppingList", "Leave"]} />
            </Uu5Elements.Button></Uu5Elements.Link> : null}

        {props.authenticated && TitleList.archived ?
          <Uu5Elements.Button top size="l" icon="uugds-up"
            onClick={() => props.data.handlerMap.archive(false)}>Activate</Uu5Elements.Button> : null}

      </Uu5Elements.Grid>

      {props.authenticated ?
        <Uu5Elements.Dialog
          style={{ backgroundColor: background === "dark" ? "#9c9c9c" : "#f5f5f5" }}
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          header={<Lsi import={importLsi} path={["ShoppingList", "DeleteConfirm"]} />}
          info={TitleList.name}
          actionList={[{
            href: "home",
            children: <Lsi import={importLsi} path={["ShoppingList", "Delete"]} />,
            icon: "mdi-delete",
            onClick: () => props.data.handlerMap.delete(),
            significance: "highlighted",
            colorScheme: "negative"
          },
          {
            children: <Lsi import={importLsi} path={["ShoppingList", "Cancel"]} />,
            onClick: () => setDeleteOpen(false),

          }]} />
        : null}

      <MyPieChart itemList={props.data.data.itemList} />


      <Uu5Forms.Form.Provider key={modalOpen} onSubmit={handleSubmit}>
        <Uu5Elements.Modal open={modalOpen} onClose={() => setModalOpen(false)}
          header={<Lsi import={importLsi} path={["ListDetail", "Rename"]} />}
          footer={
            <div>
              <Uu5Forms.CancelButton className={Config.Css.css({ margin: 5 })} onClick={() => setModalOpen(false)} />
              <Uu5Forms.SubmitButton className={Config.Css.css({ margin: 5 })} />
            </div>
          }
        >
          <Uu5Forms.FormText label={<Lsi import={importLsi} path={["ListDetail", "Name"]} />} name="name" required initialValue={TitleList.name} />

        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>

    </Uu5Elements.Block>
  );
};

export default Title;

