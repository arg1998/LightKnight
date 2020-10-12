import React from "react";
import "./App.css";
import Animator from "./Components/Animator/Animator";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import { connect } from "react-redux";
import { changePage, createNewProject } from "./redux/actions/App.actions";
const { webFrame } = require("electron");
// webFrame.setZoomFactor(0.8);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: getFactorInPercent(webFrame.getZoomFactor())
    };
  }

  componentDidMount() {
    window.addEventListener("wheel", event => {
      if (event.ctrlKey) {
        if (event.deltaY > 0) {
          //zoomout
          var zoom = this.state.currentZoom;
          if (zoom > 60) {
            this.setState({
              currentZoom: zoom - 10
            });
          }
        } else {
          //zoomin
          var zoom = this.state.currentZoom;
          if (zoom < 100) {
            this.setState({
              currentZoom: zoom + 10
            });
          }
        }
      }
    });
  }

  render() {
    const { pageName, changePage, createNewProject } = this.props;

    let page = null;
    if (pageName === "home") {
      page = (
        <HomeScreen
          changePage={changePage}
          createNewProject={createNewProject}
        />
      );
    } else if (pageName === "new_project") {
      page = <Animator />;
    } 

    webFrame.setZoomFactor(this.state.currentZoom / 100);

    return page;
  }
}

function getFactorInPercent(value) {
  return parseInt(value) * 100;
}

const mapStateToProps = newState => ({
  pageName: newState.app.pageName
});

const mapDispatchToProps = dispatch => ({
  changePage: pageName => dispatch(changePage(pageName)),
  createNewProject: (projectName, projectPath, musicPath, musicFileBlob) =>
    dispatch(
      createNewProject(projectName, projectPath, musicPath, musicFileBlob)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
