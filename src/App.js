import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ItemTimeline from './ItemTimeline';
import request from "superagent";
import Task from "./Task"


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: "",
    }
  }
  componentDidMount() {
    request
      .get('http://localhost:9292/users/1/projects')
      .end((err, res) => {
          if (err) console.log(err)
          const parsedData = JSON.parse(res.text);
          this.setState({projects: [...parsedData]})
      })
  }

  viewProject = (e) => {
    const projId = e.currentTarget.id
    request
      .get('http://localhost:9292/projects/'+projId+"/tasks")
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text);
        this.setState({selectedProject: [...parsedData]})
      })
  }

  render() {
    const projectList = this.state.projects.map((project, i) => {
      return <li key={i} id={project.id} onClick={this.viewProject}> {project.name} </li>
    })
    return (
      <div>

<<<<<<< HEAD
      {this.state.selectedProject === "" ? <ul>{projectList}</ul> : <itemTimeline selectedProject={this.state.selectedProject}/>}
      
=======
      {this.state.selectedProject === "" ? <ul>{projectList}</ul> : <ItemTimeline selectedProject={this.state.selectedProject}/>}

>>>>>>> 7463a599a8df9bce0079660723a32939be4d2376
        
       
      </div>
    );
  }
}

export default App;
