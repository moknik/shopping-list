import { useState,Utils } from "react";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";


const INITIAL_TITLE_LIST_TITLE =
    { id: 1 ,name: "Fruit List", archived: false}
const owner = true;



function Title(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [TitleList, setTitleList] = useState(INITIAL_TITLE_LIST_TITLE);
  const actionList = owner
    ? [{ icon: "uugds-richtext-toolbar", onClick: () => setModalOpen(true) }]
    : [];



    function handleSubmit(e) {
      const data = e.data.value;
      console.log(data);

      //save  data
      setTitleList((prevTitleList) => {
        return {
          ...prevTitleList,
          name: data.name,
        };
      });


    //save new data
    setModalOpen(false);
  }

  function handleDelete(id){
    //save  data
    console.log(id, "deleted", TitleList.name)
  }
  function handleArchive(id){
    //save  data
    console.log(id, "archived",   TitleList.name)
  }

  return (
    <Uu5Elements.Block  actionList={actionList}
    className={Config.Css.css({width:400, maxWidth:"100%", backgroundColor: "#f5f5f5", padding: 32, margin: "auto"})}    >
      <Uu5Elements.Grid >

      <h1>{TitleList.name}</h1>
      <Uu5Elements.Button size="l" icon="uugds-delete" onClick={() => handleDelete(TitleList.id)}>Delete</Uu5Elements.Button>
      <Uu5Elements.Button size="l" icon="uugdsstencil-uiaction-archive" onClick={() => handleArchive(TitleList.id)}>Archive</Uu5Elements.Button>
      </Uu5Elements.Grid>

      <Uu5Forms.Form.Provider key={modalOpen} onSubmit={handleSubmit}>
      <Uu5Elements.Modal open={modalOpen} onClose={() => setModalOpen(false)} header="Rename list"
    footer={
      <div>
        <Uu5Forms.CancelButton />
        <Uu5Forms.SubmitButton />
      </div>
    }
    >
      <Uu5Forms.FormText label="Name" name="name" required initialValue={TitleList.name} />

    </Uu5Elements.Modal>
    </Uu5Forms.Form.Provider>




    </Uu5Elements.Block>


  );
};

export default Title;

