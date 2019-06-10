import React from 'react'

const Card = (props) => {
  // debugger
  return (
    <div style={{width: 1000, margin:'auto'}}>
      <h1>{props.job.title}</h1>
      <h3>{props.job.location}</h3>
      <p>{props.job.employer}</p>
      <a href={props.job.href} target='_blank'>{props.job.href}</a>
      <p>{props.job.description}</p>
    </div>
  )
}

export default Card