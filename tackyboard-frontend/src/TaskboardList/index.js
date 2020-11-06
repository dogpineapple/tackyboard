import React from 'react';
import TaskboardListCard from '../TaskboardListCard';
import './TaskboardList.scss';


function TaskboardList() {

  const boards = [
    {name: "Anime board", numActives: "6", lastUpdated: "yesterday"},
    {name: "Fashion board", numActives: "4", lastUpdated: "2 days ago"},
    {name: "Book board", numActives: "8", lastUpdated: "3 days ago"}
  ]

  return (
    <div className="TaskboardList">
      <div className="TaskboardList-container">
        <h1 className="TaskboardList-title">My Tackyboards</h1>
        <div className="TaskboardList-list-container">
          <ul>
            {boards.map(board => 
            <TaskboardListCard key={board.name} name={board.name} numActives={board.numActives} lastUpdated={board.lastUpdated}/>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TaskboardList;