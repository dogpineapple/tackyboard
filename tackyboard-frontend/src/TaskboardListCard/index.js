import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './TaskboardListCard.scss';


function TaskboardListCard({ id, name, lastUpdated, handleDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  let lastUpdatedDateUTC = moment.utc(lastUpdated).toDate();
  let lastUpdatedDateLocal = moment(lastUpdatedDateUTC).local().fromNow();
  return (
    <div className="TaskboardListCard">
      <section >
        <a href={`/tackyboards/${name}/${id}`}><h1>{name}</h1></a>
        <div>Last updated {lastUpdatedDateLocal} on {moment(lastUpdated).format('l')}.</div>
      </section>
      <section>
        {showConfirm ?
          <div className="TaskboardListCard-confirm-delete">
            <p>Delete board?</p>
            <div>
              <button className="TaskboardListCard-yes" onClick={() => handleDelete(id)}>Yes</button>
              <button className="TaskboardListCard-no" onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div> :
          <FontAwesomeIcon icon={faTrashAlt} size="2x" onClick={() => setShowConfirm(true)} />
        }
      </section>
    </div>
  )
}

export default TaskboardListCard;