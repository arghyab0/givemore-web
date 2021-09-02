import userTypes from "./user.types";

//firebase utils
import { auth } from "../firebase/utils";
import { handleUserProfile } from "../firebase/utils";
import { GoogleProvider } from "../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRRENT_USER,
  payload: user,
});

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    } catch (err) {
      // console.log(err);
    }
  };

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      })
    );
  } catch (err) {
    // console.log(err);
  }
};

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err,
      });

      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });

      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          });
        })
        .catch(() => {
          const err = "Email not found";
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: err,
          });
        });
    } catch (err) {
      // console.log(err);
    }
  };

export const resetAuth = () => ({
  type: userTypes.RESET_AUTH,
});
