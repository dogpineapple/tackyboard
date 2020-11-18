import React from 'react';
import moment from 'moment';
import './TaskListCard.scss';


/**
 * Child of `TaskList` component.
 * Props: title, description, status (of a task)
 * Renders a card for a task.
 */
function TaskListCard({ id, title, description, status, lastUpdated, getTaskDetail }) {
  const statuses = {
    0: "PLANNED",
    1: "IN PROGRESS",
    2: "DONE",
    3: "DROPPED",
    4: "PENDING",
  }

  const handleClick = () => {
    getTaskDetail(id)
  }
  return (
    <div className="TaskListCard">
      <div className="TaskListCard-container" onClick={handleClick}>
      <h1 className="TaskListCard-title">{title}</h1>
      <p className="TaskListCard-description">{description}</p>
      <p>Updated {moment(lastUpdated).fromNow()}</p>
      </div>
      <p className="TaskListCard-status tooltip">{statuses[status]}<span className="TaskListCard-tooltiptext tooltiptext">Change</span></p>
    </div>
  )
}

export default TaskListCard;