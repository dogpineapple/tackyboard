import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import TaskboardListCard from '../TaskboardListCard';
import './TaskboardList.scss';
import NewTackyboardForm from '../NewTackyboardForm';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function TaskboardList() {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [taskboards, setTaskboards] = useState([]);

  useEffect(function getTaskboards() {
    async function handleGetTaskboards() {

      const resp = await axios.get(`${BASE_URL}/tackyboards`, { withCredentials: true });
      if (resp.status === 200) {
        let respBoards = resp.data;
        let tackyboards = respBoards.tackyboards;

        tackyboards.sort(function(a, b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.last_updated) - new Date(a.last_updated);
        });

        setTaskboards(tackyboards);
      } else {
        setErrors(["Error occurred, please try again later"]);
      }
    }
    handleGetTaskboards();
  }, []);

  const handleDelete = async (id) => {
    const resp = await axios.delete(`${BASE_URL}/tackyboards/${id}`, { withCredentials: true });
    if (resp.status === 200) {
      setTaskboards(currBoards => currBoards.filter(board => board.tackyboard_id !== id));
    } else {
      setErrors(["Error occurred, please try again later"]);
    }
  }

  return (
    <div className="TaskboardList">
      { errors.length > 0 && errors.map(err => {
        return <div key={err} className="error">{err}</div>
      })}
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
              return <TaskboardListCard key={board.tackyboard_id} id={board.tackyboard_id} name={board.name} lastUpdated={date.toLocaleString()} handleDelete={handleDelete} />
            })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TaskboardList;