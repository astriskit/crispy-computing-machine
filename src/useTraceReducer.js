import { useReducer, useState, useEffect } from "react";
// function usePromise(promise, defaultValue){
//   let [value, setValue] = useState(defaultValue)
//   useEffect(()=>{
//     console.log(promise)
//   }, [promise.status])
//   return [value]
// }
function withHistory(dispatch, currentHistory, setActionHistory) {
  return action => {
    let newHistory = [...currentHistory, action];
    setActionHistory(newHistory);
    dispatch(action);
  };
}
function withResetAction(reducer, initState, type = "RESET") {
  return (state, action) => {
    if (action.type === type) {
      return initState;
    } else {
      return reducer(state, action);
    }
  };
}
let historyPopper = undefined;
function useTraceReducer(
  reducer,
  initState,
  init = undefined,
  config = { fireTime: 1000 }
) {
  reducer = withResetAction(reducer, initState);
  let [state, dispatch] = useReducer(reducer, initState, init);
  let _dispatch = dispatch;
  let [history, setHistory] = useState([]);
  let [historyMirror, setHistoryMirror] = useState([]);
  let [godMode, setGodMode] = useState(false);
  dispatch = withHistory(dispatch, history, setHistory);
  useEffect(
    () => {
      if (!godMode) {
        setHistoryMirror(history);
      }
    },
    [history, godMode]
  );
  useEffect(
    () => {
      console.log("historyMirror changed", historyMirror);
    },
    [historyMirror]
  );
  const replay = () => {
    if (!history.length) return;
    console.log("replay called");
    setGodMode(true);
    _dispatch({ type: "RESET" });
    setHistory([]);
    historyPopper = setInterval(() => popHistory(), config.fireTime);
  };
  const popHistory = () => {
    console.log("popHistory called", historyMirror);
    let mirrorCopy = [...historyMirror];
    console.log(mirrorCopy.length, "pre-pop");
    let action = mirrorCopy.pop();
    console.log(mirrorCopy.length, "post-pop");
    if (action) {
      console.log("action", action, mirrorCopy);
      dispatch(action);
      setHistoryMirror(mirrorCopy);
      console.log(mirrorCopy.length, history.length, "post-setHistory");
    } else {
      clearInterval(historyPopper);
      historyPopper = undefined;
      setGodMode(false);
    }
  };
  const stop = () => {
    if (historyPopper) {
      clearInterval(historyPopper);
      console.log("history & historyMirror", history, historyMirror);
      let _history = [...history, ...historyMirror];
      setHistory(_history);
      setGodMode(false);
    }
  };
  return [state, dispatch, history, replay, stop, godMode];
}

export default useTraceReducer;
