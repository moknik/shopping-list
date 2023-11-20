//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import { DetailProvider } from "../core/detail/detailProvider.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
      margin: "auto",
    }),
};

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    return (

      <div>
        <DetailProvider />
      </div>
    );
    //@@viewOff:render
  },
});

Detail = withRoute(Detail, { authenticated: true });

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
