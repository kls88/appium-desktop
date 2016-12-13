import _ from 'lodash';

import { SET_SOURCE_AND_SCREENSHOT, QUIT_SESSION_REQUESTED, QUIT_SESSION_DONE, SELECT_ELEMENT, UNSELECT_ELEMENT,
  METHOD_CALL_REQUESTED, METHOD_CALL_DONE, SET_INPUT_VALUE, SET_EXPANDED_PATHS } from '../actions/Inspector';

// Make sure there's always at least one cap
const INITIAL_STATE = {
  expandedPaths: []
};

export default function inspector (state=INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SOURCE_AND_SCREENSHOT:
      return {
        ...state,
        source: action.source,
        screenshot: action.screenshot,
      };

    case QUIT_SESSION_REQUESTED:
      return {
        ...state,
        isQuittingSession: true,
      };
      
    case QUIT_SESSION_DONE:
      return _.omit(state, 'isQuittingSession');

    case SELECT_ELEMENT:
      var {path} = action;
      var pathArr = path.split('.');
      var selectedNode = state.source;
      for (let index of pathArr) {
        selectedNode = selectedNode.children[index];
      }

      return {
        ...state,
        selectedPath: path,
        selectedNode: {...selectedNode},
      };

    case UNSELECT_ELEMENT:
      return _.omit(state, ['selectedNode', 'selectedPath']);

    case METHOD_CALL_REQUESTED:
      return {
        ...state,
        methodCallRequested: true,
      };

    case METHOD_CALL_DONE:
      return _.omit(state, 'methodCallRequested');

    case SET_INPUT_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SET_EXPANDED_PATHS:
      return {
        ...state,
        expandedPaths: action.paths,
      };

    default:
      return {...state};
  }
}