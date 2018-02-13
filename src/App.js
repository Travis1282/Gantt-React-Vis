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
          console.log(this.state)
      })
  }

  viewProject = (e) => {
    const projId = e.currentTarget.id
    request
      .get('http://localhost:9292/projects/'+projId+'/tasks')
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text);
        this.setState({selectedProject: [...parsedData]})
      })
  }
  createItem = (newItem) => {
      request
        .post('http://localhost:9292/projects/')
        .type('form')
        .send(newItem)
        .end((err, newItem) => {
          console.log(newItem, 'response from our post route')
          // const parsedItem = JSON.parse(newItem.text)
    })
  }



  DeleteItem = (e) => {

    console.log(e.currentTarget.id, ' id of Task')
    const id = e.currentTarget.id
    console.log(id, ' id')
    request
      .delete('http://localhost:9292/projects/' + id)
      .end((err, deletedItem) => {
        console.log(deletedItem)
      })
  }



  render() {
    const projectList = this.state.projects.map((project, i) => {
      return <li key={i} id={project.id} onClick={this.viewProject}> {project.content} </li>
    })
    return (
      <div>

      {this.state.selectedProject === "" ? <ul>{projectList}</ul> : <ItemTimeline selectedProject={this.state.selectedProject} createItem={this.createItem}/>}

       
      </div>
    );
  }
}

export default App;
