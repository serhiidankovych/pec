import { authActions } from "../actions/authActions";

const initState = {
  userDetails: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default reducer;
// import { authActions } from "../actions/authActions";

// const initState = {
//   userDetails: null,
//   username: "",
// };

// const reducer = (state = initState, action) => {
//   switch (action.type) {
//     case authActions.SET_USER_DETAILS:
//       return {
//         ...state,
//         userDetails: action.userDetails,
//       };
//     case authActions.SET_USERNAME:
//       return {
//         ...state,
//         username: action.username,
//       };
//     default:
//       return state;
//   }
// };

// export default reducer;
