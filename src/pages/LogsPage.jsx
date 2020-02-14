import React, { useState } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Calendar from 'react-calendar';
import '../font.css';

{
  /* Data List from server */
}
const logs = [
  {
    id: '1',
    created_at: '2020-02-05',
    feedback: true,
    question: 'What are you doing now?',
    original: 'I ate milk-tea. It was so delicious.',
    translated: '피드백 트루',
    comprehanded: 'true',
    user_intention: '피드백 펄스',
    user_intention_translated: 'false'
  },
  {
    id: '2',
    created_at: '2020-02-13',
    feedback: false,
    question: 'What are your favorite musics? And Why?',
    original: 'I like ambition music. There music is so emphathsis.',
    translated: '피드백 트루',
    comprehanded: 'true',
    user_intention: '피드백 펄스',
    user_intention_translated: 'false'
  },
  {
    id: '3',
    created_at: '2020-02-14',
    feedback: true,
    question: 'What are your favorite musics? And Why?',
    original: 'I like ambition music. There music is so emphathsis.',
    translated: '피드백 트루',
    comprehanded: 'true',
    user_intention: '피드백 펄스',
    user_intention_translated: 'false'
  }
];


{ /* tag + style components */ }

const WholeBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 30rem;
`;

const SearchBox = styled.div`
  width: 20rem;
  left: ;
`;

const SearchInput = styled.input`
  width: 15rem;
  height: 2rem;
  font-size: 15px;
  border: 2px solid black;
  border-radius: 10px;

  // background-image: url('../icons/search.png');
  // background-repeat: no-repeat;
  // background-position: center;
  padding-right: 2rem;
  padding-left: 10px;
`;

const SearchButtons = styled.button`
  outline-color: #d48a6e;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 15.5rem;
  height: 2rem;

  img {
    border: none;
    background-color: none;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    margin-top: 3px;
  }
`;

const ClockButtons = styled.button`
  outline-color: #d48a6e;
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 2rem;

  img {
    border: none;
    background-color: none;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
`;

const ShowBox = styled.div`
  width: 20rem;
  height: 28rem;
  margin-top: 1.5rem;
`;

{
  /* Modal - Select Date */
}
const ModalWapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  display: ${props => (props.display ? 'flex' : 'none')};
  z-index: 2;
`;

const Modal = styled.div`
  background: white;
  padding: 24px 16px;
  border-radius: 4px;
  width: 320px;
`;

const ModalTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
`;

const CloseWrapper = styled.div`
  text-align: right;
`;


const moment = require('moment');


const ClockButton = props => {
  // Modal
  const [state, setState] = useState(false);

  const onClickOpen = e => {
    e.preventDefault();
    console.log('open');

    setState(prevState => !prevState);
    console.log(state);
  };

  const onClickClose = (e) => {
    e.preventDefault();
    console.log('close');

    setState(prevState => !prevState);
    console.log(state);
  };


  // Calender

  const [day, setDay] = useState(new Date());

  //setter : value or function
  // function = (prev) => {}
  const onDateChange = (date) => {
    // setState({ date: moment(date).format('YYYY-MM-DD') })
    // console.log(date);
    setDay(date);
    console.log(day);
  };

  const onClickSelect = () => {
    console.log('close and date print')

    setState(prevState => !prevState);
    console.log(day);
  }

  const CalendarClose = styled.button`
    background-color: #808080;
    border: none;
    color: white;
    padding: 0.5rem;
    text-align: center;
    text-decoraton: none;
    display: inline-block;
    font-size: 1rem;
    margin: 0.3rem;
  `

  const CalendarSelect = styled.button`
    background-color: #808080;
    border: none;
    color: white;
    padding: 0.5rem;
    text-align: center;
    text-decoraton: none;
    display: inline-block;
    font-size: 1rem;
    margin: 0.3rem;
  `

  return (
    <>
      <ClockButtons type="button" onClick={onClickOpen}>
        <img src={require('../icons/clock.png')} />
      </ClockButtons>
      <ModalWapper display={state}>
        <Modal>
          <ModalTitle>타임머신</ModalTitle>
          <Calendar onChange={onDateChange} value={day} />
          <CloseWrapper>
            <CalendarClose onClick={onClickClose}>취소</CalendarClose>
            <CalendarSelect onClick={onClickSelect}>선택</CalendarSelect>
            {/* <b>value: {day}</b> */}
          </CloseWrapper>
        </Modal>
      </ModalWapper>
    </>
  );
};

{ /* Parsing Databaset datasets and Showing */ }

function User({ user }) {
  let output = '';
  let output_trans = '';
  if (user.feedback) {
    output = user.comprehanded;
    output_trans = user.translated;
  }
  else{
    output = user.user_intention_translated;
    output_trans = user.user_intention;
  };

  return (
    <>
      <PageStyle>
        <ReturnDate value={user.created_at} />
        <LogShowBlock>
          <BubbleLeft>
            <ReturnSubject value={user.question}/>
          </BubbleLeft>
        </LogShowBlock>        
        <LogShowBlock>
          <BubbleRight>
            <ReturnInput value={user.original} />
            <ReturnUserIntend value={user.translated} />
          </BubbleRight>
        </LogShowBlock>
        <LogShowBlock>
          <BubbleLeft>
            <ReturnOutput value={output} />
            <ReturnUserIntendTrans value={output_trans} />
          </BubbleLeft>
        </LogShowBlock>
      </PageStyle>
    </>
  );
}

function RenderList({index}) {
  
  return(
    <>
      {/* <User user={logs[0]} /> */}
      {logs.map(user => (<User user={user} key={user.id} />))}
    </>
  )
}

const LogShowLine = styled.div`
  padding: 0.3rem 0px;
  font-size: 1rem;
`;

const DateStyle = styled.div`
  color: #495057;
  font-size: 0.8rem;
  padding: 0.5rem 0;
  font-weight: bold;
  text-align: center;
  border-top: 1px solid #495057;
  border-bottom: 1px solid #495057;
`;

function ReturnDate({value}) {
  return (

    <DateStyle>{value}</DateStyle>

  );
}

const TitleStyle = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;
const ContextStyle = styled.span`
  font-size: 0.9rem;
`;

function ReturnSubject({value}) {
  return (
    <LogShowLine>
      <TitleStyle>질문: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnInput({value}) {
  return (
    <LogShowLine>
      <TitleStyle>나의영작: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnUserIntend({value}) {
  return (
    <LogShowLine>
      <TitleStyle>나의의도: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnOutput({value}) {
  

  return (
    <LogShowLine>
      <TitleStyle>좋은영작: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );

}

function ReturnUserIntendTrans({value}) {
  return (
    <LogShowLine>
      <TitleStyle>좋은해석: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );

}

const LogShowBlock = styled.div`
  padding: 0.5rem 0px;
  position: relative;
`;

{
  /* Swipe */
}
const BindKey = bindKeyboard(SwipeableViews);

const PageStyle = styled.div`
  padding: 0.6rem;
  margin: 0 1.5rem;
  min-height: 26rem;
  max-height: 26rem;
  color: black;

  background-color: #e4efff;
  z-index: 1;
  border-radius: 10px;
  overflow: scroll;
`;

const BubbleRight = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;
  margin-right: 2rem;
  margin-left: 4rem;
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
`

const BubbleLeft = styled.div`

  position:relative;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;

  margin-left: 2rem;
  margin-right: 4rem;
  background: #d1c4e9;
  z-index: 2;

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

  
`

const Swipe = () => {
  const List = () => [1,2,3].map(o => <PageStyle>{o}</PageStyle>)

  return (
    <SwipeableViews key={logs.length} enableMouseEvents>
      
      {/* <PageStyle>
        <ReturnDate />
        <LogShowBlock>
          <BubbleLeft>
            <ReturnSubject />
          </BubbleLeft>
        </LogShowBlock>        
        <LogShowBlock>
          <BubbleRight>
            <ReturnInput />
            <ReturnUserIntend />
          </BubbleRight>
        </LogShowBlock>
        <LogShowBlock>
          <BubbleLeft>
            <ReturnOutput />
            <ReturnUserIntendTrans />
          </BubbleLeft>
        </LogShowBlock>
      </PageStyle> */}
      {/* <RenderList /> */}
      <List/>
      <PageStyle>slide 2</PageStyle>
      <PageStyle>slide 3</PageStyle>
    </SwipeableViews>
  );
};

{/* Swipe Button */}
const SwipeButtonLeft = styled.button`
  outline-color: #d48a6e;
  margin-right: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 15rem;
  width: 1rem;
  height: 2rem;
  padding: 0 0 0 0 !important;
  position: absolute;

  img {
    border: none;
    background-color: none;
    width: 1rem;
    height: 2rem;
    vertical-align: middle;
  }
`

const SwipeButtonRight = styled.button`
  outline-color: #d48a6e;
  margin-right: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 15rem;
  width: 1rem;
  height: 2rem;
  padding: 0 0 0 0 !important;
  position: absolute;

  img {
    border: none;
    background-color: none;
    width: 1rem;
    height: 2rem;
    vertical-align: middle;
  }
  
`

const SwipeButtonImage = styled.img`
  border: none;
  background-color: none;
  width: 1rem;
  height: 2rem;
  vertical-align: middle;
  position: absolute;
`

const onClickLeft = (e) => {
  console.log("click left");
}

const onClickRight = (e) => {
  console.log("click right");
}

{
  /* Rendering at DOM */
}
const LogsPage = props => {

  return (
    <>
      <Header />
      <Main>
        <WholeBox>
          <SearchBox>
            <SearchInput></SearchInput>
            <SearchButtons>
              <img src={require('../icons/search.png')} />
            </SearchButtons>
            <ClockButton />
          </SearchBox>
          <ShowBox>
            <SwipeButtonLeft onClick={onClickLeft}>
              <img src={require('../icons/before.png')} />
            </SwipeButtonLeft>
            <SwipeButtonRight onClick={onClickRight}>
              <img src={require('../icons/next.png')}/>
            </SwipeButtonRight>
            <Swipe />

            {/* <SwipeableViews>
              <div>
                slide 1
              </div>
              <div>
                slide 2
              </div>
              <div>
                slide 3
              </div>
            </SwipeableViews> */}
          </ShowBox>
        </WholeBox>
      </Main>
    </>
  );
};

export default LogsPage;
