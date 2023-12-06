//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useAppBackground, BackgroundProvider} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import { ShoppingListProvider } from "../core/home/shoppingListProvider.js";
import Uu5Elements from "uu5g05-elements";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
      margin: "auto",
      backgroundColor: "#2194f3"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
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
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    return (


      <div>
        <Uu5Elements.Toggle
        className={Config.Css.css(
          {
            margin: 20,

          })}
        value={!darkMode}
        onChange={() => setBackground({
          backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"])
        })}
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun"
      />
      <Uu5Elements.LanguageSelector languageList={["cs", "en"]} />



        <ShoppingListProvider dark={darkMode} />

      </div>

    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
