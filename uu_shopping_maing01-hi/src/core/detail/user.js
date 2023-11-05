import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";

function User(props) {
  return (
    <Uu5Elements.ListItem actionList={[{icon: "uugds-close", onClick: props.onDelete }]}>
      <Uu5Elements.Grid

      className={Config.Css.css(
        {

          textAlign: "center",
          display: "inline-block",
          width: "100%",
          margin: 5,

          border: "1px solid #ccc",
          borderRadius: "25px",


        })} >
        <h2>{props.name}</h2>
        <p>{props.type}</p>
      </Uu5Elements.Grid>
    </Uu5Elements.ListItem>
  );
}
export default User;
