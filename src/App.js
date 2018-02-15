import React, { Component } from 'react';
import './App.css';
import ItemTimeline from './ItemTimeline';
import request from "superagent";
import Task from "./Task"
import ProjectEdit from "./ProjectEdit"



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      projects: [],
      selectedProject: "",
      editedProject: "",
    }
  }
  componentDidMount() {
    request
      .get('http://localhost:9292/users/projects')
      .withCredentials()
      .end((err, res) => {
        if (err) {
          // console.log(err)
        } else {
          // console.log(res)
          const parsedData = JSON.parse(res.text);
          this.setState({projects: [...parsedData.projects]})
        }
      })
  }

  viewProject = (e) => {
    const index = e.currentTarget.parentNode.parentNode.id
    const id = (this.state.projects[index].id)
    request
      .get('http://localhost:9292/projects/'+id+'/tasks')

      .end((err, res) => {
        if (err) console.log(err)
        console.log(res)
        const parsedData = JSON.parse(res.text)
        
        // If the project doesn't have tasks create a task before loading
        if (parsedData.status.number_of_tasks === 0 ) {
          const now = new Date();
          const twoWeeks = now.setDate(now.getDate() +14);
          const endDate = new Date(twoWeeks);

          const item = {
            content: "First Task",
            start: new Date().toISOString().substring(0,10),
            end:  endDate.toISOString().substring(0,10),
            completed: false,
            belongs_to: 0,
            project_id: id
          }
          this.createItem(item)
        } else {
          this.setState({selectedProject: [...parsedData.tasks]})
        }
      })
  }

  createItem = (newItem) => {
      request
        .post('http://localhost:9292/tasks')
        .type('form')
        .send(newItem)
        .end((err, newItem) => {
          console.log(err, newItem)
          const parsedData = JSON.parse(newItem.text)
          this.setState({selectedProject: [...parsedData.projTasks]})
    })
  }

  deleteItem = (item) => {
    request
      .delete('http://localhost:9292/tasks/' + item)
      .end((err, deletedItem) => {
        console.log(err, deletedItem)
        const parsedData = JSON.parse(deletedItem.text)
        this.setState({selectedProject: [...parsedData.tasks]})

      })
  }

  editItem = (item) => {
    request
      .put("http://localhost:9292/tasks/"+item.id)
      .type('form')
      .send(item)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({selectedProject: [...parsedData.projTasks]})
      })
  }
  createProject = () => {
    const project = {
      content: "New Project",
      start: "",
      end: "",
      completed: false,
      user_id: this.state.user_id
    }
    request
      .post("http://localhost:9292/projects")
      .type('form')
      .send(project)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
      })

  }
  deleteProject = (e) => {
    // Gets the id of the li element the button is in
    const index = e.currentTarget.parentNode.parentNode.id
    const id = this.state.projects[index].id
    request
      .delete('http://localhost:9292/projects/'+id)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
      })
  }
  openEdit = (e) => {
    const index = e.currentTarget.parentNode.parentNode.id
    const project = this.state.projects[index]
    this.setState({editedProject: project})
  }
  editProject = (project) => {
    const id = project.id
    request
      .put('http://localhost:9292/projects/'+id)
      .type('form')
      .send(project)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
        this.setState({editedProject: ""})
      })
  }






  render() {
    console.log(this.props)
    const projectList = this.state.projects.map((project, i) => {
      return <li key={i} id={i} >
                <div className="project">
                  <h2 className="project-name" onClick={this.viewProject}>{project.content}</h2>
                  <p className="date">Start Date: {project.start}</p>
                  <p className="date">End Date: {project.end}</p>
                  <button id="edit-btn" onClick={this.openEdit}>Edit Project</button>
                  <button id="delete-btn" onClick={this.deleteProject}>Delete Project</button>
                </div>
             </li>
    })
    return (
      <div className="App">
        
      {this.state.selectedProject === "" ?<div> <div onClick={this.createProject}>+ADD NEW PROJECT</div>
        <ul>{projectList}</ul> </div> : 
        <ItemTimeline createItem={this.createItem} editItem={this.editItem} deleteItem={this.deleteItem} selectedProject={this.state.selectedProject}/>
      }

      {this.state.editedProject === "" ? null : <ProjectEdit editedProject={this.state.editedProject} editProject={this.editProject}/>}

      </div>
    );
  }
}

export default App;
