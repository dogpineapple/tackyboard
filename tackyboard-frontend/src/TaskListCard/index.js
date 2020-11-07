import React from 'react';

import './TaskListCard.scss';


/**
 * Child of `TaskList` component.
 * Props: title, description, status (of a task)
 * Renders a card for a task.
 */
function TaskListCard({ title, description, status }) {
  return (
    <div className="TaskListCard">
      <h1 className="TaskListCard-title">{title}</h1>
      <p className="TaskListCard-description">{description}</p>
      <p className="TaskListCard-status tooltip">{status.toUpperCase()}<span className="TaskListCard-tooltiptext tooltiptext">Change</span></p>
    </div>
  )
}

export default TaskListCard;