import React from 'react';

const PlayerReview = ({ player, ...props }) => {
  const { username, status, rol, mmr } = player;
  return (
    <li style={{display: '-webkit-box'}} className="list-group-item justify-content-between">
      <div className="mr-3">
        <h6 className="my-0">{username}</h6>
        <small className="text-muted">{status} | rol: {rol}</small>
      </div>
      <span className="ml-5 text-muted">MMR: {mmr}</span>
    </li>
  );
};

export default PlayerReview;
