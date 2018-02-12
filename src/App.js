import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Timeline from './Timeline';
import request from "superagent";
import Task from "./Task"


// fake data generator // temp

// function randomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }
// const getProjets = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     name: `project ${k}`,
//     startdate: `start date`+randomDate(new Date(2018, 0, 1), new Date(2018,12,31)) +``,
//     enddate: `end date` +randomDate(new Date(2019, 0, 1), new Date(2019,12,31)) +``,
//     completed: false,
//     // user_id INT references users(id)

//   }));

// const getTasks = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     name: `task ${k}`,
//     startdate: `start date`+randomDate(new Date(2018, 0, 1), new Date(2018,12,31)) +``,
//     enddate: `end date` +randomDate(new Date(2019, 0, 1), new Date(2019,12,31)) +``,
//     completed: false,
//     length: ``+ this.startdate - this.enddate +``
//     // user_id INT references users(id)

//   }));
  

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
    console.log('http://localhost:9292/projects/'+projId+"/tasks")
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

      {this.state.selectedProject === "" ? <ul>{projectList}</ul> : <Task selectedProject={this.state.selectedProject}/>}

        
       
      </div>
    );
  }
}

export default App;
