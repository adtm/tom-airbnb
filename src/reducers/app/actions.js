import * as types from './actionTypes';

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('login'));
  };
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}