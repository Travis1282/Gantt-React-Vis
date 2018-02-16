import React, { Component } from 'react';
import './App.js'
import Timeline from 'react-visjs-timeline'
import ItemEdit from './ItemEdit'
import Header from './Header'


class ItemTimeline extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedProject: this.props.selectedProject,
      editedItem: '',
      previoustime: '',
      secondtime: ''
    }
  }


  options = {
    width: '100%',
    height: '100vh',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    zoomMax: 100000000000,
    orientation: 'top',
    selectable: true,
    stack: true,
    stackSubgroups: true,
    editable: true,
    multiselect: false,
    template: function (item, element, data) {
      // console.log("this is item in the options object\n", item)
      return '<div class="containTasks"><div class="draggingDots"></div><div>'+ item.content +'</div><div class="draggingDots"></div></div>';
      // return '<div>'+ item.content +'</div>';
    },
    onMove: (task, callback) => {
        const item = {
          content: task.content,
          start: task.start.toISOString().substring(0,10),
          end: task.end.toISOString().substring(0,10),
          completed: task.completed,
          id: task.id,
          belongs_to: task.belongs_to,
          project_id: task.project_id,
        } 
        console.log(item)
      this.props.editItem(item);
    },
    onUpdate: (e) => {
      this.setState({editedItem: e})
    },
    onAdd: (e) => {
  // post
      this.setState({editedItem: e})
      this.props.createItem(e)
    }
}



  removeModal = () => {
    this.setState({editedItem: ""})
  }

  getEdits = (item) => {
    this.props.editItem(item);
    this.setState({editedItem: ""})
    // this.setState({items: ""})
  }

  render(){

    return (
      <div>
        <Header removeProject={this.props.removeProject} id={this.props.selectedProject[0].project_id} createItem={this.props.createItem} />
        <Timeline options={this.options}  items={this.props.selectedProject} />
              {this.state.editedItem ==="" ? null : <ItemEdit editedItem ={this.state.editedItem}  removeModal={this.removeModal} getEdits={this.getEdits} deleteItem={this.props.deleteItem} /> }
        </div>
    );

  }
}
export default ItemTimeline;    
