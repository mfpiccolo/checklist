/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

console.disableYellowBox = true;

import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import MainNavigator from "./components/MainNavigator";

// Redux Config
import * as reducers from "./reducers";
const reducer = combineReducers(reducers);
const middleware = applyMiddleware(thunkMiddleware);
let store;
if (__DEV__) {
  // Development mode with Redux DevTools support enabled.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevents Redux DevTools from re-dispatching all previous actions.
        shouldHotReload: false
      })
    : compose;
  // Create the redux store.
  store = createStore(reducer, composeEnhancers(middleware));
} else {
  // Production mode.
  store = createStore(reducer, compose(middleware));
}
// End Redux Config

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
