import React from 'react';
import './TaskList.css';
import TaskListCard from '../TaskListCard';

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
      <TaskListCard title="Develop Tackyboard" description="Finish the code!" status="In progress"/>
    </div>
  );
}

export default TaskList;