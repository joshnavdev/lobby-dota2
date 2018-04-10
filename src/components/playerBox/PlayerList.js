import React from 'react';

const PlayerList = props => {
  return (
    <ul className="list-group ">
      <li className="list-group-item d-flex justify-content-between mb-3">
        <div>
          <h6 className="my-0">Usuario-name</h6>
          <small className="text-muted">status</small>
        </div>
        <span className="text-muted">Mmr: 3020</span>
      </li>
    </ul>
  );
};

export default PlayerList;
