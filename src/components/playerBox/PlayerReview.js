import React from 'react';

const PlayerReview = ({ player, ...props }) => {
  const { username, status, rol, mmr } = player;
  const style = {
    offline: 'secondary',
    online: 'success',
    searching: 'info',
    waiting: 'warning',
    playing: 'danger',
  }
  return (
    <li style={{display: '-webkit-box'}} className="list-group-item justify-content-between">
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <h6>{username}</h6>
          <h6>MMR: {mmr}</h6>
        </div>
        <div className="d-flex justify-content-between">
          <small className="text-muted">Rol: {rol}</small>
          <span className={`badge badge-pill badge-${style[status]}`}>{status}</span>
        </div>
      </div>
      
    </li>
  );
};

export default PlayerReview;
