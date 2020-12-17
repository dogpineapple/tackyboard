import React from 'react';
import moment from 'moment';
import { statuses } from '../helpers';
import './TaskListCard.scss';


/**
 * Child of `TaskList` component.
 * Props: title, description, status (of a task)
 * Renders a card for a task.
 */
function TaskListCard({ task, getTaskDetail }) {

  const handleClick = () => {
    getTaskDetail(task.task_id)
  }

  return (
    <div className="TaskListCard">
      <div className="TaskListCard-container" onClick={handleClick}>
        <h1 className="TaskListCard-title">{task.task_title}</h1>
        <p className="TaskListCard-description">{task.task_description}</p>
        <p className="TaskListCard-deadline">Due {moment(task.deadline).utc().format("ddd, MM[/]D[/]YYYY")}</p>
        <p>Updated {moment(task.last_status_update).fromNow()}</p>
      </div>
      <p className="TaskListCard-status tooltip" style={{ backgroundColor: statuses[task.status_id].color }}>{statuses[task.status_id].status}<span className="TaskListCard-tooltiptext tooltiptext">Change</span></p>
    </div>
  )
}

export default TaskListCard;