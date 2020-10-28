import React from 'react';
import ClickToCopyList from '../ClickToCopyList';
import './Taskboard.css';
import TaskDetail from '../TaskDetail';
import TaskList from '../TaskList';

function Taskboard() {
  // this component should:
  /*1. Access the store OR axios "GET" request for all tasks related to a Taskboard`*/
  /*2. A method to handle the POST request for `NewTaskForm` to pass as a prop to
  `TaskDetail` component */ 
  /*3. Access the store for a selected task's TackyCards if the user clicks on a `TaskListCard`
      in the `TaskList` */ 

      // tasks -> put it in the store { tasks: [{task}, {task}, {task}] }
      // user clicks on a task in the tasklist 
        // -> triggers code to the "GET" route for the selected task's TackyCards with the task's id

  const taskDetails = {
    id: 1,
    title: "Develop Tackyboard",
    description: "Finish the code",
    status: "In progress",
    tackycards: [{
      id: 2,
      title: "Need to do backend-code updates",
      body: `Currently, the backend code is still written to
            handle job search-related task managing, so it has
            to be updated to handle universal tasks.
            First, update the Database Schema
            Second, update the api routes`,
    }],
  }

  return (
    <div className="Taskboard">
      <section className="Taskboard-window1">
        <TaskList />
      </section>
      <section className="Taskboard-window2">
        <TaskDetail task={taskDetails}/>
      </section>
      <section className="Taskboard-window3">
        <ClickToCopyList />
      </section>

    </div>
  )
}

export default Taskboard;