import React, { useEffect, useState } from 'react';
import './TaskList.css';
import TaskListCard from '../TaskListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import NewTaskForm from '../NewTaskForm';

/**
 * Child of `Taskboard` component.
 * Props: tasks (array of `task` objects)
 * TaskList renders `TaskListCard`(s) on 
 *    the left-most window of the `Taskboard` component. 
 */
function TaskList({ tasks, getTaskDetail, addTask}) {
  const [showForm, setShowForm] = useState(false);
  // for each task in tasks... (use `.map`)
  // create a TaskListCard 

  //displays new task card form
  const handleShowForm = (evt) => {
    setShowForm(!showForm);
  }
  

  return (
    <div className="TaskList" >
      <div className="TaskList-new-task-button tooltip">
        <FontAwesomeIcon icon={faPlusCircle} size="3x" onClick={handleShowForm} ></FontAwesomeIcon>
        <span className="tooltiptext">New task</span>
      </div>
      {showForm && <NewTaskForm addTask={addTask} />}
      {tasks.length > 0 ?
        tasks.map(task => {
          return <TaskListCard key={task.task_id} id={task.task_id} title={task.task_title} description={task.task_description} status={task.status_id} lastUpdated={task.last_status_update} getTaskDetail={getTaskDetail}/>
        })
        :
        <div>No tasks available.</div>
      }
    </div>
  );
}

export default TaskList;