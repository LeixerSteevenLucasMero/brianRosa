// authActions.js
export const login = () => ({
    type: 'LOGIN',
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  // authReducer.js
  const initialState = {
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  