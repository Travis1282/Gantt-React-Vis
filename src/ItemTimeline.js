import React, { Component } from 'react';
import './App.js'
import Timeline from 'react-visjs-timeline'

const options = {
  width: '100%',
  height: '90vh',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  zoomMax: 100000000000,
  orientation: 'top',
  selectable: true,
  stack: true,
  stackSubgroups: true,
  // clickToUse: true,
  groupEditable: true,
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}


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
      items: this.props.selectedProject
    }
  }

  render(){
    console.log(this.state.items)
  return (
    <div>
      <Timeline options={options} items={this.state.items}/>
      Timeline
    </div>
  );

  }
}
export default ItemTimeline;    
