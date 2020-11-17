import React from 'react';
import moment from 'moment';
import './TaskboardListCard.scss';


function TaskboardListCard({ name, lastUpdated }) {
  return (
    <div className="TaskboardListCard">
      <h1>{name}</h1>
      <div>Last updated {moment(lastUpdated).fromNow()} on {moment(lastUpdated).format('lll')}.</div>
    </div>
  )
}

export default TaskboardListCard;