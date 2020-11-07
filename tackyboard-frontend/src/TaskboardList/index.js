import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import TaskboardListCard from '../TaskboardListCard';
import './TaskboardList.scss';
import NewTackyboardForm from '../NewTackyboardForm';
import axios from 'axios';

const getTackyboardsUrl = `http://localhost:5000/tackyboards?_token=${localStorage.getItem("_token")}`;

function TaskboardList() {
  const [showForm, setShowForm] = useState(false);
  const [taskboards, setTaskboards] = useState([]);

  useEffect(function getTaskboards() {
    async function handleGetTaskboards() {
      const resp = await axios.get(getTackyboardsUrl);
      console.log("resp...", resp.data);
      let respBoards = resp.data;
      setTaskboards(respBoards.tackyboards);
    }
    handleGetTaskboards();
  }, []);

  console.log("taskboards...", taskboards);

  return (
    <div className="TaskboardList">
      <div className="TaskboardList-container">
        <div className="TaskboardList-title">
          <h1 className="title">My Tackyboards</h1>
          <FontAwesomeIcon className="TackyboardList-add-btn" icon={showForm ? faMinusCircle : faPlusCircle} size="2x" onClick={() => setShowForm(!showForm)} />
          {showForm && <div className="TaskboardList-form">
            <NewTackyboardForm setShowForm={setShowForm} setTaskboards={setTaskboards} />
          </div>}
        </div>
        <div className="TaskboardList-list-container">
          <ul>
            {taskboards.map(board => {
              let date = new Date(board.last_updated);
              return <TaskboardListCard key={board.last_updated} name={board.name} lastUpdated={date.toLocaleString()} />})
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TaskboardList;