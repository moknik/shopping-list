import  { Utils, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Item from "./item.js";
import Config from "../config/config.js";

const INITIAL_ITEM_LIST = [
   { name: "apple", amount: 5, id: Utils.String.generateId(), resolved: false},
   { name: "banana", amount: 3, id: Utils.String.generateId(), resolved: false},
   { name: "orange", amount: 7, id: Utils.String.generateId(), resolved:true},
   { name: "pear", amount: 2, id: Utils.String.generateId(), resolved: false},
   { name: "pineapple", amount: 1, id: Utils.String.generateId(), resolved: true}
  ]


function ItemList(props) {
  const [itemList, setItemList] = useState(INITIAL_ITEM_LIST);

  const [modalOpen, setModalOpen] = useState(false);

  const Css = {
    main: () =>
      Config.Css.css({

        display: "inline-block",
        maxWidth: "100%",
        backgroundColor: "#f5f5f5",
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


function handlerDelete(id){
  setItemList(([...actualItemList]) => {
  const index = actualItemList.findIndex((item) => item.id === id);
  actualItemList.splice(index, 1);
  console.log(id,actualItemList[index].name, "deleted")
  return actualItemList;
});
}
function handlerResolved(id){
  const data = id;

  //save new data
  setItemList(prevItemList => {
    const index = prevItemList.findIndex(item => item.id === id);
    const updatedItemList = [...prevItemList];
    updatedItemList[index] = {
      ...updatedItemList[index],
      resolved: !updatedItemList[index].resolved
    };
    console.log(data,updatedItemList[index].name, "resolved:", updatedItemList[index].resolved);
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
    console.log(id,updatedItemList[index].name, updatedItemList[index].amount)
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
    console.log(id,updatedItemList[index].name, updatedItemList[index].amount)
    return updatedItemList;
  });
}

function filterItems(filter) {
  setItemList(itemList => {
    const updatedItemList = [...INITIAL_ITEM_LIST]
    switch (filter) {
      case "All":
        return updatedItemList;
      case "Resolved":
        return updatedItemList.filter((item) => item.resolved);
      case "Unresolved":
        return updatedItemList.filter((item) => !item.resolved);
      default:
        return updatedItemList;

  }});
}

  return (
    <Uu5Elements.Block {...attrs}
    header="Item" headerType="title" actionList={[{icon: "mdi-plus", onClick: () => setModalOpen(true)}]}>

        <Uu5Elements.Button {...attrsButton} size="l" icon="mdi-circle-outline" onClick={() => filterItems("All")}>All</Uu5Elements.Button>
        <Uu5Elements.Button {...attrsButton} size="l" icon="mdi-check-circle-outline" onClick={() => filterItems("Resolved")}>Resolved</Uu5Elements.Button>
        <Uu5Elements.Button {...attrsButton} size="l" icon="mdi-close-circle-outline" onClick={() => filterItems("Unresolved")}>Unresolved</Uu5Elements.Button>

      <Uu5Elements.Grid >


      {itemList.map((item) => (
        <Item key={item.id}  {...item}
        onDelete={() => handlerDelete(item.id)}
        onChecked={() => handlerResolved(item.id)}
        upAmount={() => handlerUpAmount(item.id)}
        downAmount={() => handlerDownAmount(item.id)}
        />
      ))}


    </Uu5Elements.Grid>

    <Uu5Forms.Form.Provider key={modalOpen} onSubmit={handleSubmit}>

    <Uu5Elements.Modal open={modalOpen} onClose={() => setModalOpen(false)} header="Create item"
    footer={
      <div>
        <Uu5Forms.CancelButton />
        <Uu5Forms.SubmitButton />
      </div>

    }
    >
        <Uu5Forms.FormText label="Name" name="name" required />
        <Uu5Forms.FormNumber label="Amount" name="amount" initialValue={1} required min={1}/>




    </Uu5Elements.Modal>
    </Uu5Forms.Form.Provider>
    </Uu5Elements.Block>
  );
};

export default ItemList;

