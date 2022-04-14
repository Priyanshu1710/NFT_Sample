import React from "react";
import { Router, Route } from "react-router-dom";
import SvgSprite from "./utility/SvgSpriteLoader";
//App routes
import { publicRoutes } from "./routes";

import "./ant.less";
import "./app.scss";

//Svg Sprite
import svgFile from "./assets/images/svg/svg-sprite.svg";
import history from "./common/history";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SvgSprite url={svgFile} />
        <Router
          history={history}
          basename={process.env.REACT_APP_BASENAME || ""}
        >
          {publicRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
