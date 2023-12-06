import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";
import importLsi from "../../lsi/import-lsi.js";
import { Lsi } from "uu5g05";

function Item(props) {
  //console.log("propsItem", props);
  return (
    <Uu5Elements.ListItem actionList={!props.archived ? [{ icon: "uugds-close", onClick: props.onDelete }] : null}>
      <Uu5Elements.Grid className={Config.Css.css(
        {
          textAlign: "center",
          display: "inline-block",
          width: "100%",
          margin: 5,
          padding: 30,
          border: "1px solid #ccc",
          borderRadius: "25px",
        })} >
        <div className={Config.Css.css(
          {
            display: "inline-block",
            borderRadius: "25px",
            fontSize: "1.5rem",
            fontType: "bold",
            margin: 10,
          })}>{props.name}</div>

        {!props.archived ?
          <Uu5Elements.Button icon="uugds-minus" onClick={props.downAmount}
            className={Config.Css.css(
              {
                display: "inline-block",
                borderRadius: "25px",
              })} /> : null}

        <div className={Config.Css.css(
          {
            display: "inline-block",
            fontSize: "1.5rem",
            margin: 10,
          })} ><Lsi import={importLsi} path={["ListDetail", "Amount"]} /> : {props.amount}</div>

        {!props.archived ?
          <Uu5Elements.Button icon="uugds-plus" onClick={props.upAmount}
            className={Config.Css.css(
              {
                display: "inline-block",
                borderRadius: "25px",

              })} /> : null}
        {!props.archived ?
          <Uu5Elements.Box
            onClick={props.onChecked}
            className={Config.Css.css({
              display: "inline-block",
              paddingRight: "10px",
              borderRadius: "15px",
              marginLeft: 20,
            })}
          >
            <Uu5Forms.Checkbox
              label={<Lsi import={importLsi} path={["ListDetail", "Resolved"]} />}
              box={false} value={props.resolved} borderRadius="expressive" />
          </Uu5Elements.Box>
          :
          <Uu5Elements.Box className={Config.Css.css({
            display: "inline-block",
            paddingRight: "10px",
            borderRadius: "15px",
            marginLeft: 20,
          })}>
            <Uu5Forms.Checkbox label="Resolved" disabled={true} box={false} value={props.resolved} borderRadius="expressive" />

          </Uu5Elements.Box>
        }
      </Uu5Elements.Grid>
    </Uu5Elements.ListItem>
  );
}
export default Item;
