import React from "react";
import "./HomeScreen.css";
import NewProject from "./NewProject/NewProject";
import LoadProject from "./LoadProject/LoadProject";

function HomeScreen(props) {
  const { createNewProject } = props;
  return (
    <div className={"HS_Container"}>
      <div className={"HS_Option"}>
        <p>New Project</p>
        <NewProject onCreate={createNewProject} />
      </div>
      <div className={"HS_Option"}>
        <p>Open Project</p>
        <LoadProject />
      </div>
    </div>
  );
}

export default HomeScreen;
