import React from 'react';
import './TaskboardListCard.scss';


function TaskboardListCard({ name, numActives, lastUpdated }) {
  return (
    <div className="TaskboardListCard">
      <h1>{name}</h1>
      <div>{numActives} active tasks</div>
      <div>Last updated {lastUpdated}.</div>
    </div>
  )
}

export default TaskboardListCard;