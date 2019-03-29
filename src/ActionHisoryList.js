import React from "react";
import PropTypes from "prop-types";

const ActionHistoryList = ({
  list = [],
  onPlay,
  onStop,
  playing: isPlaying
}) => {
  return (
    <div id="action-history-list">
      <div className="list-header">
        <span>Dispatched actions in sequence</span>
        <span>No of items: {list.length}</span>
        <div>
          <button onClick={onPlay} disabled={isPlaying}>
            Play
          </button>
          <button onClick={onStop} disabled={!isPlaying}>
            Stop
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>S.No.</td>
              <td>Action-type</td>
              <td>Payload</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.type}</td>
                <td>{JSON.stringify(item.payload)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ActionHistoryList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      payload: PropTypes.any.isRequired
    })
  )
};

export default ActionHistoryList;
