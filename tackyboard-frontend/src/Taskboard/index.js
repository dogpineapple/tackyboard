import React, { useState, useEffect } from 'react';
import ClickToCopyList from '../ClickToCopyList';
import './Taskboard.css';
import TaskDetail from '../TaskDetail';
import TaskList from '../TaskList';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = "http://localhost:5000";

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
  const [taskDetail, setTaskDetail] = useState()
  const [tasks, setTasks] = useState([]);
  const { boardId } = useParams();


  useEffect(function handleGetTasks() {
    async function getTasks() {
      const res = await Axios.get(`${BASE_URL}/tackyboard/${boardId}/tasks`, { withCredentials: true });
      setTasks(res.data.tasks);
    }
    getTasks();
  }, []);

  const getTaskDetail = async (taskId) => {
    const res = await Axios.get(`${BASE_URL}/tackyboard/${boardId}/tasks/${taskId}`, { withCredentials: true });
    if (res.status === 200) {
      setTaskDetail(res.data);
    }
  }

  const addTask = async (data) => {
    const res = await Axios.post(`${BASE_URL}/tackyboard/${boardId}/tasks`, data, { withCredentials: true });
    if (res.status === 201) {
      setTasks(currTasks => [res.data.task, ...currTasks]);
    }
  }

  return (
    <div className="Taskboard">
      <section className="Taskboard-window1">
        <TaskList addTask={addTask} tasks={tasks} setTasks={setTasks} getTaskDetail={getTaskDetail} />
      </section>
      <section className="Taskboard-window2">
        {taskDetail && <TaskDetail taskDetail={taskDetail} setTaskDetail={setTaskDetail}/>}
      </section>
      <section className="Taskboard-window3">
        <ClickToCopyList />
      </section>
    </div>
  )
}

export default Taskboard;




// const taskDetails = {
//   id: 1,
//   title: "Develop Tackyboard",
//   description: "Finish the code",
//   status: "In progress",
//   tackycards: [{
//     id: 2,
//     title: "Need to do backend-code updates",
//     body: `Currently, the backend code is still written to
//           handle job search-related task managing, so it has
//           to be updated to handle universal tasks.
//           First, update the Database Schema
//           Second, update the api routes`,
//   }, {
//     id: 3,
//     title: "Need to do backend-code updates",
//     body: `Currently, the backend code is still written to
//           handle job search-related task managing, so it has
//           to be updated to handle universal tasks.
//           First, update the Database Schema
//           Second, update the api routes`,
//   }],
// }