import React, { createContext, useEffect, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { getCurrentUser, hasTokenSet } from "util/AuthUtils";

export const CustomAppContext = createContext();

const reducer = (state, pair) => ({ ...state, ...pair });

const initialState = {  currentUser: null};

export default function MyAppProvider({ children }) {
  const [state, update] = useReducer(reducer, initialState);
  function loadCurrentUser() {
    getCurrentUser()
      .then((response) => {
        update({ currentUser: response });
      })
      .catch((_) => {
        console.error(_.message);
      });
  }

  useEffect(() => {
    if (hasTokenSet) {
      loadCurrentUser();
    }
  }, []);

  const value = useMemo(() => ({ state, update }), [state]);

  return <CustomAppContext.Provider value={value}>{children}</CustomAppContext.Provider>;
}

MyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
