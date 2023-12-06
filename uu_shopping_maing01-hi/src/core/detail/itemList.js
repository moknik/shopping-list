import { Utils, useState, useBackground, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Item from "./item.js";
import Config from "../config/config.js";
import { useEffect } from "react";
import importLsi from "../../lsi/import-lsi.js";
import React from "react";
import Calls from "../../calls.js";

function ItemList(props) {

  const [ItemList, setItemList] = useState([]);
  //const [itemList, setItemList] = useState(props.itemList.itemList || []);
  useEffect(() => {
    // Update the state when props.itemList.itemList changes
    setItemList(props.itemList.itemList || []);
  }, [props.itemList.itemList]);

  // console.log("props.itemList.itemList", props.itemList);

  const [modalOpen, setModalOpen] = useState(false);
  var background = useBackground();

  const Css = {
    main: () =>
      Config.Css.css({

        display: "inline-block",
        maxWidth: "100%",
        backgroundColor: background === "dark" ? "#9c9c9c" : "#f5f5f5",
        padding: "32px",
        margin: "auto",
        width: 700,
      }),
    button: () =>
      Config.Css.css({
        margin: 5,
      }),

  };

  const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
  const attrsButton = Utils.VisualComponent.getAttrs(props, Css.button());

  function handlerDelete(id) {
    setItemList(([...actualItemList]) => {
      const index = actualItemList.findIndex((item) => item.id === id);
      actualItemList.splice(index, 1);
      console.log(id, actualItemList[index].name, "deleted")
      Calls.deleteItem({ listID: props.itemList.id, itemId: id });
      return actualItemList;
    });
  }
  function handlerResolved(id) {
    //save new data
    setItemList(prevItemList => {
      const index = prevItemList.findIndex(item => item.id === id);
      const updatedItemList = [...prevItemList];
      updatedItemList[index] = {
        ...updatedItemList[index],
        resolved: !updatedItemList[index].resolved
      };
      // console.log(data, updatedItemList[index].name, "resolved:", updatedItemList[index].resolved);
      Calls.updateItem({ listID: props.itemList.id, itemId: id, resolved: updatedItemList[index].resolved });
      return updatedItemList;
    });
  }
  function handleSubmit(e) {
    const data = e.data.value;
    console.log(data);

    //save new data
    setItemList(prevItemList => [
      ...prevItemList,
      { ...data, id: Utils.String.generateId(), resolved: false }
    ]);
    Calls.createItem({ listID: props.itemList.id, name: data.name, amount: data.amount });

    setModalOpen(false);
  }

  function handlerUpAmount(id) {
    //save new data
    setItemList(prevItemList => {
      const index = prevItemList.findIndex(item => item.id === id);
      const updatedItemList = [...prevItemList];
      updatedItemList[index] = {
        ...updatedItemList[index],
        amount: updatedItemList[index].amount + 1
      };
      //  console.log(id, updatedItemList[index].name, updatedItemList[index].amount)
      Calls.updateItem({ listID: props.itemList.id, itemId: id, amount: updatedItemList[index].amount });
      return updatedItemList;
    });
  }

  function handlerDownAmount(id) {
    //save new data
    setItemList(prevItemList => {
      const index = prevItemList.findIndex(item => item.id === id);
      const updatedItemList = [...prevItemList];
      if (updatedItemList[index].amount === 1) handlerDelete(id);
      else {
        updatedItemList[index] = {
          ...updatedItemList[index],
          amount: updatedItemList[index].amount - 1
        };
      }
      //console.log(id, updatedItemList[index].name, updatedItemList[index].amount)
      Calls.updateItem({ listID: props.itemList.id, itemId: id, amount: updatedItemList[index].amount });
      return updatedItemList;
    });
  }
  function filterItems(filter) {
    setItemList(ItemList => {
      const updatedItemList = [...props.itemList.itemList]
      switch (filter) {
        case "All":
          return updatedItemList;
        case "Resolved":
          return updatedItemList.filter((item) => item.resolved);
        case "Unresolved":
          return updatedItemList.filter((item) => !item.resolved);
        default:
          return updatedItemList;
      }
    });
  }

  return (
    <Uu5Elements.Block {...attrs}
      header={<Lsi import={importLsi} path={["ListDetail", "ListBuy"]} />} headerType="title"
      actionList={
        !props.itemList.archived
          ? [{ icon: "mdi-plus", onClick: () => setModalOpen(true) }]
          : []}>

      <Uu5Elements.Button {...attrsButton} size="l" icon="mdi-circle-outline" onClick={() => filterItems("All")}>
        <Lsi import={importLsi} path={["ListDetail", "All"]} />
      </Uu5Elements.Button>
      <Uu5Elements.Button {...attrsButton} size="l" icon="mdi-check-circle-outline" onClick={() => filterItems("Resolved")}>
        <Lsi import={importLsi} path={["ListDetail", "Resolved"]} />
      </Uu5Elements.Button>
      <Uu5Elements.Button {...attrsButton} size="l" icon="mdi-close-circle-outline" onClick={() => filterItems("Unresolved")}>
        <Lsi import={importLsi} path={["ListDetail", "Unresolved"]} />
      </Uu5Elements.Button>

      <Uu5Elements.Grid >

        {ItemList.map((item) => (
          <Item key={item.id}  {...item} archived={props.itemList.archived}
            onDelete={() => handlerDelete(item.id)}
            onChecked={() => handlerResolved(item.id)}
            upAmount={() => handlerUpAmount(item.id)}
            downAmount={() => handlerDownAmount(item.id)}
          />
        ))}

      </Uu5Elements.Grid>

      <Uu5Forms.Form.Provider key={modalOpen} onSubmit={handleSubmit}>

        <Uu5Elements.Modal open={modalOpen} onClose={() => setModalOpen(false)} header={<Lsi import={importLsi} path={["ListDetail", "AddItem"]} />}
          footer={
            <div>
              <Uu5Forms.CancelButton className={Config.Css.css({ margin: 5 })} onClick={() => setModalOpen(false)} />
              <Uu5Forms.SubmitButton className={Config.Css.css({ margin: 5 })} />
            </div>

          }
        >

          <Uu5Forms.Form.View gridLayout={{ xs: "name, amount", s: "name amount" }}>
            <Uu5Forms.FormText label={<Lsi import={importLsi} path={["ListDetail", "Name"]} />} name="name" required />
            <Uu5Forms.FormNumber label={<Lsi import={importLsi} path={["ListDetail", "Amount"]} />} name="amount" initialValue={1} required min={1} />
          </Uu5Forms.Form.View>

        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    </Uu5Elements.Block>
  );
};

export default ItemList;

