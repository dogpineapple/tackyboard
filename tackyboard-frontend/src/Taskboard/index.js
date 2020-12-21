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
  const [taskDetail, setTaskDetail] = useState();
  const [tasks, setTasks] = useState([]);
  const { boardId, boardName } = useParams();


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

  // deletes a task
  const deleteTask = async (taskId) => {
    const res = await Axios.delete(`${BASE_URL}/tackyboard/${boardId}/tasks/${taskId}`, { withCredentials: true })
    if (res.status === 200) {
      let filteredTasks = tasks.filter(task => {
        return task.task_id !== taskId;
      });
      setTasks(filteredTasks);
      setTaskDetail();
    }
  }

  const editTask = async (taskId, data) => {
    const res = await Axios.patch(`${BASE_URL}/tackyboard/${boardId}/tasks/${taskId}`, data, { withCredentials: true })
    if (res.status === 200) {
      // update the `tasks` state by changing the name/description of the task that was
      // just editted without changing the order of the tasks in the `tasks` state.
      let updatedTasks = tasks.map(task => {
        if (task.task_id === taskId) {
          return res.data.task;
        } else {
          return task;
        }
      });
      setTaskDetail(currTask => ({ ...currTask, task: res.data.task}));
      setTasks(updatedTasks);
    }
  }

  const deleteTackynote = async (taskId, noteId) => {
    const res = await Axios.delete(`${BASE_URL}/tackyboard/${boardId}/tasks/${taskId}/tackynotes/${noteId}`, { withCredentials: true });
    if (res.status === 200) {
      // deletion successful
      let filteredNotes = taskDetail.tackynotes.filter(note => note.tackynote_id !== noteId);
      setTaskDetail(currDetail => ({...currDetail, tackynotes: filteredNotes}));
    } else {
      console.log(`an error occurred: ${res}`);
    }
  }

  return (
    <div className="Taskboard">
      <header className="Taskboard-header">
        <h1>{boardName}</h1>
      </header>
      <div className="Taskboard-window-cont">
      <section className="Taskboard-window1">
        <TaskList addTask={addTask} tasks={tasks} setTasks={setTasks} getTaskDetail={getTaskDetail} editTask={editTask}/>
      </section>
      <section className="Taskboard-window2">
        {taskDetail ? <TaskDetail taskDetail={taskDetail} setTaskDetail={setTaskDetail} deleteTask={deleteTask} editTask={editTask} deleteTackynote={deleteTackynote}/> 
          : <div className="Taskboard-no-task-detail">Click on a task to view details.</div>}
      </section>
      <section className="Taskboard-window3">
        <ClickToCopyList />
      </section>
      </div>
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