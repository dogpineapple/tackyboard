import React from 'react';
import './TaskList.css';
import TaskListCard from '../TaskListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * Child of `Taskboard` component.
 * Props: tasks (array of `task` objects)
 * TaskList renders `TaskListCard`(s) on 
 *    the left-most window of the `Taskboard` component. 
 */
function TaskList(tasks) {
  // for each task in tasks... (use `.map`)
    // create a TaskListCard 
  return (
    <div className="TaskList" >
      <FontAwesomeIcon className="TaskList-new-task-button" icon={faPlusCircle} size="3x" onClick={() => console.log("-new Task Form modal pop-up here-")}/>
      <TaskListCard id="1" title="Develop Tackyboard" description="Finish the code!" status="In progress"/>
    </div>
  );
}

export default TaskList;