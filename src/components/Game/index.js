import React from 'react';
import {AppConst} from '../../constants/App.const';
import './Game.css';

class Game extends React.Component {
    constructor(props){
        super(props);
        const defaultScore = AppConst.POINTS[0];
        this.state = {
            player1_score: defaultScore,
            player2_score: defaultScore,
            gameOver: false,
            winner: null    
        }
        this.player1_wins = 0;
        this.player2_wins = 0;
    }
    
    _updateScore = (player) => {
        let scoreObj = {};
        if(player === AppConst.PLAYER_1) {
            if(this.player1_wins < AppConst.POINTS.length-1) {
                scoreObj.player1_score = AppConst.POINTS[++this.player1_wins];
            }    
            else {
                scoreObj = {
                    winner: AppConst.PLAYER_1,
                    gameOver: true
                };
            }
        } else {
            if(this.player2_wins < AppConst.POINTS.length-1) {
                scoreObj.player2_score = AppConst.POINTS[++this.player2_wins];
            }    
            else {
                scoreObj = {
                    winner: AppConst.PLAYER_2,
                    gameOver: true
                };
            }
        }
        this.setState(scoreObj);
    }

    render = () => {
        return (
            <div>
                <div className="game">
                    <div className="player player-1">
                        <h4>{AppConst.PLAYER_1}</h4>
                        <div className="score-container">{AppConst.SCORE} : <span className="score">{this.state.player1_score}</span></div>
                        <button onClick={this._updateScore.bind(this, AppConst.PLAYER_1)}
                                disabled={this.state.gameOver}>
                            {AppConst.WIN_THE_BALL}
                        </button>
                    </div>
                    <div className="player player-2">
                        <h4>{AppConst.PLAYER_2}</h4>
                        <div className="score-container">{AppConst.SCORE} : <span className="score">{this.state.player2_score}</span></div>
                        <button onClick={this._updateScore.bind(this, AppConst.PLAYER_2)}
                                disabled={this.state.gameOver}>
                            {AppConst.WIN_THE_BALL}
                        </button>
                    </div>
                </div>
                {this.state.gameOver && <div className="game-over">{this.state.winner} {AppConst.WON_THE_GAME}</div>}
            </div>
        );
    }
}

export default Game;
