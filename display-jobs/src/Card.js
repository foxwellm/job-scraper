import React, { Component } from 'react'
import './Card.css'

class Card extends Component {

  componentDidMount = () => {
    
    
    var text = document.getElementById(`desc${this.props.index}`);
    // debugger
    var str = text.innerHTML
    const reg = /React|blue|green|orange/ig; //g is to replace all occurances
    
    //fixing a bit
    var toStr = String(reg);
    var color = (toStr.replace('\/g', '|')).substring(1);
    
    //split it baby
    var colors = color.split("|");
    
    if (colors.indexOf("React") > -1) {
      str = str.replace(/React/g, '<span style="color:red;">React</span>');
    }
    
    if (colors.indexOf("blue") > -1) {
      str = str.replace(/blue/g, '<span style="color:blue;">blue</span>');
    }
    
    if (colors.indexOf("green") > -1) {
      str = str.replace(/green/g, '<span style="color:green;">green</span>');
    }
    
    if (colors.indexOf("orange") > -1) {
      str = str.replace(/orange/g, '<span style="color:orange;">orange</span>');
    }
    
    
    // document.getElementById("desc").innerText = '';
    document.getElementById(`desc${this.props.index}`).innerHTML = str;
    
  }
  
  render() {
    // debugger
    
    
    const desc = `desc${this.props.index}`
    const gLocation = `https://www.google.com/maps/place/${this.props.job.location}`
    
    return (
      <div style={{ width: 1000, margin: 'auto' }}>
        <h1>{this.props.job.title}</h1>
        <a href={gLocation} target='_blank' rel="noopener noreferrer">{this.props.job.location}</a>
        <p>{this.props.job.employer}</p>
        <a href={this.props.job.href} target='_blank' rel="noopener noreferrer">{this.props.job.href}</a>
        <p id={desc}>{this.props.job.description}</p>
        <p id='updated-desc'></p>
      </div>
    )
  }
}

export default Card