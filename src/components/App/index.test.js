import React from 'react';
import {shallow} from 'enzyme';
import App from './';
import Game from '../Game/';
import {AppConst} from '../../constants/App.const';


describe("<App/> component", () => {
  let wrapper = shallow(<App/>);
  
  it("The application should have the correct title", () => {
    expect(wrapper.find("header h2").text()).toEqual(AppConst.TITLE);
  });

  it("Appliaction should render the <Game /> component", () => {
    expect(wrapper.find(Game).length).toEqual(1);
  });

});