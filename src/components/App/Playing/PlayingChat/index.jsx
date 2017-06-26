import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.css';

const PlayingChat = ({ addMessage, cover, messages }) => (
  <div id={styles.root}>
    { cover && <div className={styles.rootCover}>make selection</div>}
    <div id={styles.rootLog}>
      {messages.reverse().map(o => (
        <div
          key={o.id}
          className={`${styles.rootLogMessage} ${o.self ? styles.rootLogSelf : styles.rootLogOther}`}
        >{o.body}</div>
      ))}
    </div>
    <div id={styles.rootInput}>
      <input
        type="text"
        className="form-control"
        onKeyPress={(e) => {
          const body = e.target.value;
          if (e.key === 'Enter' && body !== '') {
            addMessage({
              body,
              self: true,
            });
            e.target.value = '';
          }
        }}
      />
    </div>
  </div>
);
PlayingChat.propTypes = {
  addMessage: PropTypes.func.isRequired,
  cover: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  messages: PropTypes.array.isRequired,
};
export default PlayingChat;
