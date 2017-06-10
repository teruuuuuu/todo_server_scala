import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import DarkBaseContainer from './component/thema/DarkBase';
import Board from './page/Board';
import TodoContainer from './page/TodoContainer';

export const urls = {
  index: '/',
  board: '/board',
  todo: '/todo',
};



export const routes = (
  [
   <Route path={urls.index} component={DarkBaseContainer}><IndexRoute component={TodoContainer} /></Route>,
   <Route path={urls.todo} component={DarkBaseContainer}><IndexRoute component={TodoContainer} /></Route>,
   <Route path={urls.board} component={DarkBaseContainer}><IndexRoute component={Board} /></Route>]
);
