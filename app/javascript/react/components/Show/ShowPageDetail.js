import React, { Fragment } from 'react'

const ShowPageDetail = (props) => {
  debugger
  return(
    <Fragment>
      <div className="formTitle">
        {props.title}
      </div>
      <div className="formText">
        {props.body}
      </div>
    </Fragment>
  )
}

export default ShowPageDetail
