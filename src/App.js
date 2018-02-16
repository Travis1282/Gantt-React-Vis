import React, { Component } from 'react';
import './App.css';
import ItemTimeline from './ItemTimeline';
import request from "superagent";
import Task from "./Task"
import ProjectEdit from "./ProjectEdit"
import ProjectHeader from "./ProjectHeader"

const url= "https://warm-cliffs-32185.herokuapp.com";


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
      .get(url+'/users/projects')
      .withCredentials()
      .end((err, res) => {
        if (err) {
          // console.log(err)
        } else {
          // console.log(res)
          const parsedData = JSON.parse(res.text);
          this.setState({projects: [...parsedData.projects]})
          this.setState({user_id: parsedData.user_id})
        }
      })
  }

  viewProject = (e) => {
    const index = e.currentTarget.parentNode.parentNode.id
    const id = (this.state.projects[index].id)
    request
      .get(url+'/'+id+'/tasks')

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
        .post(url+'tasks')
        .type('form')
        .send(newItem)
        .end((err, newItem) => {
          console.log(err, newItem)
          const parsedData = JSON.parse(newItem.text)
          this.setState({selectedProject: [...parsedData.projTasks]})
    })
  }

  deleteItem = (id) => {
    console.log(id)
    request
      .delete(url'/tasks/' + id)
      .withCredentials()
      .end((err, res) => {
        console.log(err, res)
        const parsedData = JSON.parse(res.text)
        this.setState({selectedProject: [...parsedData.tasks]})
      })
  }

  editItem = (item) => {
    request
      .put(url'/tasks/'+item.id)
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
      .post(url'/projects")
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
    const index = e.currentTarget.parentNode.parentNode.parentNode.id
    const id = this.state.projects[index].id

    console.log(index)
    console.log(id)
    request
      .delete(url+'/'+id)
      .end((err, res) => {
        if (err) console.log(err)
        console.log(res)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
      })
  }
  openEdit = (e) => {
    console.log(e.currentTarget.parentNode.parentNode.parentNode.id)
    const index = e.currentTarget.parentNode.parentNode.parentNode.id
    const project = this.state.projects[index]
    this.setState({editedProject: project})
  }
  editProject = (project) => {
    const id = project.id
    request
      .put(url+'/projects/'+id)
      .type('form')
      .send(project)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
        this.setState({editedProject: ""})
      })
  }

  removeModal = () => {
    this.setState({editedProject: ""})
  }
  removeProject = () =>{
    this.setState({selectedProject:""})
  }


  render() {
    // console.log(this.props)
    const projectList = this.state.projects.map((project, i) => {
      return  (     
            <div key={i} id={i} className="projectContainer">
                <div className="project">
                  <h2 className="project-name" onClick={this.viewProject}>{project.content}</h2>
                    <p className="date">Start Date: {project.start}</p>
                    <p className="date">End Date: {project.end}</p>
                  <div className="spacer"></div>
                  <div class="col-md-3 col-sm-3 col-xs-6"> <a href="#" class="btn btn-sm animated-button victoria-blue"onClick={this.openEdit}>Edit Project</a> </div>
                  <div class="col-md-3 col-sm-3 col-xs-6"> <a href="#" class="btn btn-sm animated-button victoria-red"onClick={this.deleteProject}>Delete Project</a> </div>
               </div>
             </div>
      )

    })
    return (
      <div className="App">
      {this.state.selectedProject === "" ? <div> <ProjectHeader createItem={this.state.createProject} /> 

      <ul>{projectList}</ul> </div> : 
        <ItemTimeline removeProject={this.removeProject} createItem={this.createItem} editItem={this.editItem} deleteItem={this.deleteItem} selectedProject={this.state.selectedProject}/>
      }

      {this.state.editedProject === "" ? null : <ProjectEdit editedProject={this.state.editedProject} removeModal={this.removeModal} editProject={this.editProject}/>}

      </div>
    );
  }
}

export default App;
