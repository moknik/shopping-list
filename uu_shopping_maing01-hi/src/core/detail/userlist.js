import  Uu5, { Utils, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import User from "./user.js";
import Config from "../config/config.js";



const INITIAL_USER_LIST = [
  { name: "John", id: 1, type: "reader"},
  { name: "Peter", id: 2, type: "reader"},
  { name: "Mary", id: 3, type: "reader"},
  { name: "Lucy", id: 4, type: "owner"},
  { name: "Tom", id: 5, type: "owner"},
  { name: "Bob", id: 6, type: "owner"} ]

  function UserList(props) {
    const [UserList, setUserList] = useState(INITIAL_USER_LIST);

    const [modalOpen, setModalOpen] = useState(false);
    const Css = {
      main: () =>
        Config.Css.css({

          display: "inline-block",




          backgroundColor: "#f5f5f5",
          padding: "32px",
          margin: "auto",
          width: 300,
          maxWidth: "100%",
        }),


    };
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
  function handlerDelete(id){
    //save new data
    setUserList(([...actualUserList]) => {
    const index = actualUserList.findIndex((user) => user.id === id);
    actualUserList.splice(index, 1);
    return actualUserList;
  });

  }
  function handleSubmit(e) {
    const data = e.data.value;
    console.log(data);
    //save new data
    setUserList(prevUserList => [
      ...prevUserList,
      { ...data, id: Utils.String.generateId() }
    ]);

    setModalOpen(false);
  }



    return (
      <Uu5Elements.Block {...attrs}
      header="User" headerType="title" actionList={[{icon: "uugds-plus", onClick: () => setModalOpen(true)}]}>
        <Uu5Elements.Grid >

        {UserList.map((user) => ( <User key={user.id}  {...user}
        onDelete={() => handlerDelete(user.id)} /> ))}

      </Uu5Elements.Grid>

      <Uu5Forms.Form.Provider key={modalOpen} onSubmit={handleSubmit}>

    <Uu5Elements.Modal open={modalOpen} onClose={() => setModalOpen(false)} header="Add user"
    footer={
      <div>
        <Uu5Forms.CancelButton />
        <Uu5Forms.SubmitButton />
      </div>

    }
    >

        <Uu5Forms.FormSelect
          itemList ={UserList.map((user) => ({
            value: user.id,
            children: user.name,
            icon: "uugdsstencil-user-account-solid"
          }))}
          label="User"
          name="id"
          required
          multiple

        />






    </Uu5Elements.Modal>
    </Uu5Forms.Form.Provider>
        </Uu5Elements.Block>);

  }
  export default UserList;


