import React from 'react';
import ClickToCopyList from '../ClickToCopyList';
import './Taskboard.css';
import TaskDetail from '../TaskDetail';
import TaskList from '../TaskList';

function Taskboard() {
  const taskDetails = {
    title: "Develop Tackyboard",
    description: "Finish the code",
    status: "In progress",
    tackycards: [{
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