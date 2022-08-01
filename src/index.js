import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import rootReducer from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";

// __REDUX_DEVTOOLS_EXTENSION__

const oriEx = window.__REDUX_DEVTOOLS_EXTENSION__;

window.__REDUX_DEVTOOLS_EXTENSION__ = (...args) => {
  console.log("ex", args);
  const result = oriEx(...args);
  console.log("ex result", result);
  return result;
};

Object.keys(oriEx).forEach(
  (key) => (window.__REDUX_DEVTOOLS_EXTENSION__[key] = oriEx[key])
);

// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const oriExComp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = (...args) => {
  alert("sd");
  console.log("ex comp", args);
  const result = oriExComp(...args);
  console.log("ex comp result", result);
  return result;
};

Object.keys(oriExComp).forEach(
  (key) => (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__[key] = oriExComp[key])
);
// Object.assign(window.__REDUX_DEVTOOLS_EXTENSION__, oriEx);
// ---------------------
// const oriSend = window.__REDUX_DEVTOOLS_EXTENSION__.send;

// window.__REDUX_DEVTOOLS_EXTENSION__.send = (...args) => {
//   console.log(args);

//   return oriSend.apply(window.__REDUX_DEVTOOLS_EXTENSION__, args);
// };

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

window.__REDUX_DEVTOOLS_EXTENSION__.listen(console.log);

const composeEnhancers = composeWithDevTools({
  name: "test",
  trace: true,
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    persist: true, // persist states on page reloading
    export: true, // export history of actions in a file
    import: "custom", // import history of actions from a file
    jump: true, // jump back and forth (time travelling)
    skip: true, // skip (cancel) actions
    reorder: true, // drag and drop actions in the history list
    dispatch: true, // dispatch custom actions or action creators
    test: true // generate tests for the selected actions
  }
});

function middleware(store) {
  return (next) => (action) => {
    console.log(action);

    return next(action);
  };
}

const enhancer = composeEnhancers(
  // [middleware]
  applyMiddleware(middleware)
  // other store enhancers if any
);

console.log(enhancer);

const store = createStore(rootReducer, enhancer);

store.subscribe(console.log);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
