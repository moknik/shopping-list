import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";

function User(props) {
  const owner = props.owner;


  return (
    <Uu5Elements.ListItem actionList={owner ? [{ icon: "uugds-close", onClick: props.onDelete }] : null} >

      <Uu5Elements.Grid

        className={Config.Css.css(
          {

            textAlign: "center",
            display: "table-cell",
            width: "100%",
            margin: 5,

            border: "1px solid #ccc",
            borderRadius: "25px",


          })} >
        <h2>{props.name}</h2>
        </Uu5Elements.Grid>
    </Uu5Elements.ListItem>
  );
}
export default User;
