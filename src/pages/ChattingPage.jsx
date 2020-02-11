import React from 'react';
import Header from '../components/Header';

const ChattingPage = props => {
  const {
    match: {
      params: { chat_id }
    }
  } = props;

  return (
    <>
      <Header />
      <div>ChattingPage!! chat_id: {chat_id}</div>
    </>
  );
};

export default ChattingPage;
