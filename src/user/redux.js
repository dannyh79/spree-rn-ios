import {userLogInReq} from '../spree/api';

const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

const initState = {
  bearerToken: '',
  loggedIn: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        bearerToken: action.bearerToken,
        loggedIn: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        bearerToken: '',
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;

export const logIn = (bearerToken) => ({
  type: LOGIN,
  bearerToken,
});

export const logOut = () => ({
  type: LOGOUT,
});

export const userLogIn = (credentials) => {
  return async (dispatch, _getState) => {
    const bearerToken = await userLogInReq(credentials);

    dispatch(logIn(bearerToken));
  };
};
