import React from 'react'

const Card = (props) => {
  // debugger
  return (
    <div>
      <h1>{props.job.title}</h1>
      <h3>{props.job.location}</h3>
      <p>{props.job.company}</p>
      <a href={props.job.job} target='_blank'>{props.job.job}</a>
      <p>{props.job.body}</p>
    </div>
  )
}

export default Card