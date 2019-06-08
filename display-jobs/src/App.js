import React, {Component} from 'react';
import './App.css';
import Card from './Card'
// import {jobs} from './allFilteredJobs/jobs'

class App extends Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
  }
  componentDidMount = async() => {
    let fetched = await fetch('allFilteredJobs.json')
    const fetchJSON = await fetched.json()
    this.setState({jobs: fetchJSON})
  
  }
  render() {
// debugger
    return (
      <div className="App">
        {
          this.state.jobs.map(job => {
            return <Card job={job} />
          })
        }
      </div>
    );
  }
}

export default App;
