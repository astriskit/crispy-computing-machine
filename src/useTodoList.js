import { useEffect } from "react";
import useTraceReducer from "./useTraceReducer";

function withLog(dispatch) {
  return action => {
    if (window.__DEV__) {
      console.log(`Dispatch: ${action.type} ::payload: ${action.payload}`);
    }
    dispatch(action);
  };
}

// let actionHistoryMirror = [];

function useTodoList(reducer, initList, init) {
  let [list, dispatch, actionHistory, replay, stop, playing] = useTraceReducer(
    reducer,
    initList,
    init
  );
  useEffect(
    () => {
      if (window.__DEV__) {
        console.table(list);
      }
    },
    [list]
  );
  dispatch = withLog(dispatch);
  const addItem = value => {
    if (!playing) dispatch({ type: "ADD_TODO", payload: value });
  };
  const updateItemValue = (itemId, newValue) => {
    if (!playing)
      dispatch({
        type: "UPDATE_TODO",
        payload: { id: itemId, title: newValue }
      });
  };
  const toggleDone = itemId => {
    if (!playing) dispatch({ type: "TOGGLE_DONE_TODO", payload: itemId });
  };
  const removeItem = itemId => {
    if (!playing) dispatch({ type: "REMOVE_TODO", payload: itemId });
  };
  return {
    list,
    actionHistory,
    addItem,
    updateItemValue,
    toggleDone,
    removeItem,
    replay,
    stop,
    playing
  };
}

export default useTodoList;
