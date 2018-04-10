import React from 'react';

const Header = props => {
  return (
    <div className="py-5 text-center">
      <img className="d-block mx-auto mb-4" src="https://orig00.deviantart.net/97fe/f/2013/332/c/4/dota_2_icon_by_benashvili-d6w0695.png" alt width={72} height={72} />
      <h2 className="text-white">Dota2 Lobby</h2>
      <p className="lead text-white">
        Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.
      </p>
    </div>
  );
};

export default Header;
