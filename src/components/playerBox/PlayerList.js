import React, {Component} from 'react';
import PlayerReview from './PlayerReview';
import { connect } from 'react-redux';
import { fetchPlayers, updatePlayers } from '../../actions/playerActions';

class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.props.socket.on('UPDATE_PLAYERS', player => {
      this.props.dispatch(updatePlayers(player))
    });

    this.props.socket.on('RECEIVE_PLAYERS', (players = []) => {
      this.props.dispatch(updatePlayers(players));
    });
  }

  componentDidMount() {
    // this.props.dispatch(fetchPlayers());
    this.props.socket.emit('SEND_PLAYERS');
  }

  renderPlayerReview = (players) => {
    return players.map(player => (<PlayerReview key={player._id} player={player} />));
  }

  render() {
    if (this.props.loading) {
      return (
        <h1 className="text-white text-center">Loading...</h1>
      )
    }
    return (
      <ul style={{ overflowY: 'scroll', maxHeight: '600px' }} className="list-group">
        {this.renderPlayerReview(this.props.players)}
      </ul>
    );
  }
}

const mapStateToProps = state => state.players;

export default connect(mapStateToProps)(PlayerList);
