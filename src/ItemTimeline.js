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
      editedItem: '',
      items: this.props.selectedProject
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
     // console.log(this.state.editedItem)
  },
  // Currently broken because it doesn't have an end date
  onAdd: (e) => {
    this.setState({editedItem: e})
    console.log(e)
  }
}

  render(){
    // console.log(this.state.items)
  return (
    <div>
      <Timeline options={this.options} items={this.state.items}/>
      Timeline
      {this.state.editedItem ==="" ? null : <ItemEdit editedItem ={this.state.editedItem}/>}
    </div>
  );

  }
}
export default ItemTimeline;    
