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

const Block = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  text-align: center;
`;

const Text = styled.span`
  font-weight: bold;
  font-size: 25px;
  line-height: 60px;
  vertical-algin: middle;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  vertical-align: middle;
`;

const MessageContainer = styled.div`
  width: 340px;
  height: 400px;
  min-width: 340px;
  min-height: 400px;
  list-style: none;
  outline: 1px solid black;

  overflow: scroll;
  scrollTo: height;
`;

const ChatBox = styled.ul`
  list-style: none;
  padding-left: 0.5rem !important;
`;

const BubbleLeft = styled.div`
  position:relative;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;
  
  margin-top: 10px;
  margin-left: 1rem;
  margin-right: 6rem;
  background: #d1c4e9;
  z-index: 2;

  font-size: 1rem;

  :after {
    content: "";
    position: absolute;
    border-style: solid;
    /* reduce the damage in FF3.0 */
    display:block;
    width: 0;

    top: 1rem;
    left: -1.3rem; /* value = - border-left-width - border-right-width */
    bottom:auto;
    border-width: 1rem 1.5rem 0 0; /* vary these values to change the angle of the vertex */
    border-color:transparent #d1c4e9;
    z-index: 1;
  }
`;

const BubbleRight = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;

  margin-top: 10px;
  margin-right: 1rem;
  margin-left: 6rem;
  background: #ffd966;

  :after {
    content:"";
    position:absolute;
    border-style:solid;

    /* reduce the damage in FF3.0 */
    display:block;
    width:0;
    
    top: 1rem;
    right:-1.3rem; /* value = - border-left-width - border-right-width */
    bottom: auto;
    left: auto;
    border-width: 1rem 0 0 1.5rem; /* vary these values to change the angle of the vertex */
    border-color:transparent #ffd966 ;
  }
`;

const YesButton = styled.button`
  position: absolute;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;
  right: 85px;
  bottom: 70px;
  background: #ffd966;
`;

const NoButton = styled.button`
  position: absolute;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;
  right: 5px;
  bottom: 70px;
  background: #ffd966;
`;

const ReButton = styled.button`
  position: absolute;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;
  left: 5px;
  bottom: 70px;
  background: #ffd966;
  z-index: 3;
`

const OtherButton = styled.button`
  position: absolute;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;
  left: 105px;
  bottom: 70px;
  background: #ffd966;
  z-index: 3;
`

const UserInput = styled.textarea`
  width: 90%;
  height: 5%;
  vertical-align: middle;
  margin-top: 4px;
  margin-left: 1px;
  bottom: 0;
  font-size: 1rem;
`;


const SendButton = styled.button`
  vertical-align: middle;
  width: 5%
  margin-top: 4px;
  margin-left: 1px;
  background-color: transparent;
  border: none;
  img {
    width: 5%;
    height: 5%;
  }
`;


const example = {
  id: '123124125',
  question: '안녕 오늘 하루는 어땠어?',
  original: 'im so tired',
  translated: `I'm so tired`,
  comprehended: '나는 피곤해',
  user_intention: '피곤한 하루였어',
  user_intention_translated: 'it was so tired day'
};


const Chat = ({chat}) => {
  if (chat.type === "mamago") return <BubbleLeft>{chat.message}</BubbleLeft>;
  if (chat.type === "user") return <BubbleRight>{chat.message}</BubbleRight>;
};

const ChatList = props => {
  const { children } = props;
  return <ChatBox>{children}</ChatBox>;
};

const CheckStep = ({value}) => {
  console.log(value)
  if (value === STEP.feedback) {
    return (
    <span>
      <YesButton>맞아</YesButton>
      <NoButton>아니야</NoButton>
    </span>
    )
  }
  else if (value === STEP.user_intention_translated) {
    return (
      <span>
        <ReButton>이 질문으로 다시 할래요</ReButton>
        <OtherButton>다른 질문으로 할래요</OtherButton>
      </span>
    );
  }
  else {
    return null;
  }
}

const STEP = {
  question: 0,
  original: 1,
  comprehended: 2,
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
        // case STEP.comprehended:
        // case STEP.translated:
        case STEP.feedback:
          if (R.includes(message, ['맞아', 'yes', 'ㅇㅇ', '응'])) {
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
    // dispatch(fetchUserDialogs());
    setMessage(e.target.value);
  };

  return (
    <Template>
      <Header />
      <Main>
        <br />
        <Block>
          <Title>
            <Image src={require('../images/mamago_logo.png')} />
            <Text>MAMAGO</Text>
          </Title>
          <MessageContainer>
            <ChatList>
              {chats.map(c => (
                <Chat chat={c}/>
              ))}
            </ChatList>
            <CheckStep value={step}></CheckStep>
          </MessageContainer>
          
          <span>
            <UserInput placeholder="마마고와 대화를 시작하세요!" type="text" value={message} onInput={handleInput}></UserInput>
            <SendButton onClick={sendMessage}>
              <img src={require('../images/send.png')} />
            </SendButton>
          </span>
        </Block>
      </Main>
    </Template>
  );
};

export default ChattingPage;
