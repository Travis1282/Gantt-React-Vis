import React, { Component } from 'react';
import './App.js'
import Timeline from 'react-visjs-timeline'
import ItemEdit from './ItemEdit'





  const getItemStyle = () => ({
      width: ``+ this.length +``,
      background: 'lightgreen'
      // background: isDragging ? 'lightgreen' : 'grey',
  });

// style={getItemStyle()}

class ItemTimeline extends Component {

  constructor(props){
    super(props)
    this.state = {
      editedItem: ''
    }
  }

  options = {
  width: '100%',
  height: '500px',
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
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  },
  onUpdate: (e) => {
    this.setState({editedItem: e})
  },
  onAdd: (e) => {
// post
    this.setState({editedItem: e})
    this.props.createItem(e)
    // console.log(e)
  }
}

getEdits = (item) => {
  this.props.editItem(item);
  this.setState({editedItem: ""})
  this.setState({items: ""})
}
  render(){
    console.log("ItemTimeLine state items", this.state.items, this.props.items, '<------- props')
  return (
    <div>
      <Timeline options={this.options} items={this.props.selectedProject}/>
      Timeline
      {this.state.editedItem ==="" ? null : <ItemEdit editedItem ={this.state.editedItem} getEdits={this.getEdits} deleteItem={this.props.deleteItem} /> }
    </div>
  );

  }
}
export default ItemTimeline;    
