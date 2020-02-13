import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';

import Header from '../components/Header';
import Main from '../components/Main';
import Template from '../components/Template';
import { ADD_CHAT, SET_CHATS, SET_DIALOG } from '../types';
import { fetchUserDialogs } from '../actions/dialogs';
import { buildChats } from '../services/util';

const example = {
  id: '123124125',
  question: '안녕 오늘 하루는 어땠어?',
  original: 'im so tired',
  translated: `I'm so tired`,
  comprehanded: '나는 피곤해',
  user_intention: '피곤한 하루였어',
  user_intention_translated: 'it was so tired day'
};

const Chat = props => <li>{props.children}</li>;
const ChatList = props => {
  const { children } = props;
  return <ul>{children}</ul>;
};

const STEP = {
  question: 0,
  original: 1,
  comprehanded: 2,
  translated: 3,
  feedback: 4,
  user_intention: 5,
  user_intention_translated: 6
};
const ChattingPage = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const dialog = useSelector(state => state.dialog);
  const chats = useSelector(state => state.chats);

  const [message, setMessage] = useState('');

  const [step, setStep] = useState(STEP.original);
  useEffect(() => {
    console.log('얍');
    dispatch({
      type: SET_CHATS,
      payload: buildChats(dialog)
    });
  }, [dialog]);
  const sendMessage = e => {
    e.preventDefault();
    if (!R.isEmpty(message)) {
      switch (step) {
        // case STEP.question:
        case STEP.original:
          dispatch({
            type: SET_DIALOG,
            payload: { ...dialog, original: message }
          });
          setStep(STEP.feedback);
          break;
        // case STEP.comprehanded:
        // case STEP.translated:
        case STEP.feedback:
          if (R.includes(message, ['맞아', 'yes', 'ㅇㅇ'])) {
            dispatch({
              type: SET_DIALOG,
              payload: { ...dialog, feedback: true }
            });
          } else {
            dispatch({
              type: SET_DIALOG,
              payload: { ...dialog, feedback: false }
            });
          }
          setStep(STEP.user_intention);
          break;
        case STEP.user_intention:
          dispatch({
            type: SET_DIALOG,
            payload: { ...dialog, user_intention: message }
          });
          setStep(STEP.user_intention_translated);
          break;
        default:
          return;
      }
    }
    setMessage('');
  };

  const handleInput = e => {
    e.preventDefault();
    dispatch(fetchUserDialogs());
    setMessage(e.target.value);
  };

  return (
    <Template>
      <Header />
      <Main>
        <br />
        {t('test')}
        <textarea type="text" value={message} onInput={handleInput} />
        <button onClick={sendMessage}>SEND</button>
        <ChatList>
          {chats.map(c => (
            <Chat>{c}</Chat>
          ))}
        </ChatList>
      </Main>
    </Template>
  );
};

export default ChattingPage;
