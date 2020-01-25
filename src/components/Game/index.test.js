import React from 'react';
import {shallow} from 'enzyme';
import Game from './';
import {AppConst} from '../../constants/App.const';

describe("<Game /> component", () => {
    let wrapper;
    let instance;
    beforeEach(() => {
        wrapper = shallow(<Game />);
        instance = wrapper.instance();
    });

    it("Should have label for each player", () => {
        let playerList = wrapper.find("div.player h4");
        expect(playerList.length).toEqual(2);
        expect(playerList.at(0).text()).toEqual(AppConst.PLAYER_1_NAME);
        expect(playerList.at(1).text()).toEqual(AppConst.PLAYER_2_NAME);
    });

    it("Should have 'Win the ball' button for each player", () => {
        let buttons = wrapper.find("div.player button");
        expect(buttons.length).toEqual(2);
        expect(buttons.at(0).text()).toEqual(AppConst.WIN_THE_BALL);
    });

    it("The default score should be 0 for both the players", () => {
        let scoreList = wrapper.find("div.player .score");
        expect(scoreList.at(0).text()).toEqual("0");
        expect(scoreList.at(1).text()).toEqual("0");
    });

    it("The Score should be updated for the player, clicking upon Win the ball button", () => {
        let player1WinButton = wrapper.find("div.player-1 button");
        player1WinButton.simulate("click");
        expect(wrapper.find(".player-1 .score").text()).toEqual("15");
        player1WinButton.simulate("click");
        expect(wrapper.find(".player-1 .score").text()).toEqual("30");

        let player2WinButton = wrapper.find("div.player-2 button");
        player2WinButton.simulate("click");
        expect(wrapper.find(".player-2 .score").text()).toEqual("15");

    });

    it("Player should win if his score is 40 and win the ball", () => {
        let player1WinButton = wrapper.find("div.player-1 button");
        wrapper.setState({
            player1: {
                ...wrapper.state,
                wins:3
            }
        });
        player1WinButton.simulate("click");
        expect(wrapper.find(".game-over").text()).toEqual(AppConst.PLAYER_1_NAME + " " + AppConst.WON_THE_GAME);
    });
    
    it("Buttons should be disabled after the game is over", () => {
        wrapper.setState({
            gameOver: true
        });
        let buttons = wrapper.find("div.player button");
        expect(buttons.at(0).is('[disabled]')).toBeTruthy();
        expect(buttons.at(1).is('[disabled]')).toBeTruthy();
    });

    it("Score should be Deuce if both players win 3 balls", () => {
        wrapper.setState({
            player1: {
                ...wrapper.state.player1,
                wins: 3
            },
            player2:{
                ...wrapper.state.player2,
                wins: 2
            }
        });

        let player2WinButton = wrapper.find("div.player-2 button");
        player2WinButton.simulate("click");
        expect(wrapper.find(".player-1 .score").text()).toEqual(AppConst.DEUCE);
        expect(wrapper.find(".player-2 .score").text()).toEqual(AppConst.DEUCE);
    });

});
