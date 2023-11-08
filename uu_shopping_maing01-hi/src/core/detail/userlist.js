import Uu5, { Utils, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import User from "./user.js";
import Config from "../config/config.js";


function UserList(props) {
  const [UserList, setUserList] = useState(props.userList);
  const [shoppingList, setShoppingList] = useState(props.shoppingList);
  const [actUserList, setActUserList] = useState(


    UserList.filter((user) => shoppingList.userList.includes(user.id))
  );
  const [notUserList, setNotUserList] = useState(
    UserList.filter((user) => !shoppingList.userList.includes(user.id))
  );

  const [modalOpen, setModalOpen] = useState(false);

  const actionList = shoppingList.owner
  ? [{ icon: "mdi-plus", onClick: () => setModalOpen(true) }]
  : [];


  const Css = {
    main: () =>
      Config.Css.css({

        display: "inline-block",

        borderRadius: "0 0 50px 50px",


        backgroundColor: "#f5f5f5",
        padding: "32px",
        margin: "auto",
        width: 300,
        maxWidth: "100%",
      }),


  };
  const attrs = Utils.VisualComponent.getAttrs(props, Css.main());



  function handlerDelete(id) {
    const data = id;

    //save new data
    setUserList(([...actualUserList]) => {
      const index = actualUserList.findIndex((user) => user.id === id);
      actUserList.splice(index, 1);
      console.log(data, actualUserList[index].name, "deleted");
      return actualUserList;
    });

  }
  function handleSubmit(e) {
    const data = Array.isArray(e.data.value.id) ? e.data.value.id : [e.data.value.id];
    console.log(data);
    //save new data
    data.forEach((userId) => {
      const selectedUser = UserList.find((user) => user.id === userId);
      console.log(selectedUser.name, "added");
      if (selectedUser) {
        setActUserList((prevUserList) => [
          ...prevUserList,
          {
            id: selectedUser.id,
            name: selectedUser.name,
          },
        ]);
      }
    });

    setModalOpen(false);
  }



  return (
    <Uu5Elements.Block {...attrs}
      header="List of users"
      headerType="title"
      actionList={actionList}

    >

          <Uu5Elements.Grid >


        {actUserList.map((user) => (<User key={user.id}  {...user} owner={shoppingList.owner}
          onDelete={() => handlerDelete(user.id)} />))}

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
            itemList={notUserList.map((user) => ({
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


