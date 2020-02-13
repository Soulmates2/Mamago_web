import React, {useState} from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import {bindKeyboard} from 'react-swipeable-views-utils'
import Calendar from 'react-calendar';
import '../font.css';


{/* Data List from server */}
const logs = [
  {
    id: "1",
    date: "2020-02-05",
    subject: "daily log",
    input: "I ate milk-tea. It was so delicious.",
    output: "I ate mild tea. It was so delicious.",
    user_intend: "나는 밀크티를 먹었다. 매우 맛있었다.",
    user_intend_translate: "나는 밀크티를 먹었다. 매우 맛있었다."
  },
  {
    id: "2",
    date: "2020-02-12",
    subject: "favorite music",
    input: "I like ambition music. There music is so emphathsis.",
    output: "I like ambition music. Music is very sympathetic there.",
    user_intend: "나는 엠비션 뮤직을 좋아한다. 그들의 음악은 매우 공감된다.",
    usr_intend_translate: "나는 엠비션 뮤직을 좋아한다. 그들의 음악은 매우 공감된다."  }
];

{/* tag + style components */}
const WholeBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 30rem;
  
`

const SearchBox = styled.div`
  width: 20rem;
  left:
`

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
`

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
`

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
`

const ShowBox = styled.div`
  width: 20rem;
  height: 25rem;
  margin-top: 1rem;
`


{/* Modal - Select Date */}
const ModalWapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  display: ${props => props.display ?  "flex" : "none"};
  z-index: 2;
`

const Modal = styled.div`
  background: white;
  padding: 24px 16px;
  border-radius: 4px;
  width: 320px;
`

const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`

const CloseWrapper = styled.div`
  text-align: right;
`

const ClockButton = (props) => {
  // Modal
  const [state, setState] = useState(false);

  const onClickOpen = (e) => {
    e.preventDefault();
    console.log("open");
    
    setState(prevState => !prevState)
    console.log(state);
  }

  const onClickClose = (e) => {
    e.preventDefault();
    console.log("close");
    
    setState(prevState => !prevState)
    console.log(state);
  }

  // Calender
  const moment = require('moment');

  const date = {
    day: new Date()
  }

  const onDateChange = (date) => {
    setState({
      date: moment(date).format("YYYY-MM-DD")
    })
  }
  
  return (
    <>
      <ClockButtons type="button" onClick={onClickOpen}>
        <img src={require("../icons/clock.png")}/>
      </ClockButtons>
      <ModalWapper display={state}>
        <Modal>
          <ModalTitle>
            타임머신
          </ModalTitle>
          <Calendar onChange={onDateChange} value={date.day} />
          <CloseWrapper>
            <button onClick={onClickClose}>취소</button>
            <button>선택</button>
          </CloseWrapper>
        </Modal>
      </ModalWapper>
    </>
    
  )
}


{/* Parsing Databaset datasets and Showing */}
function User({user, isDate, isSubject, isInput, isOutput, isHangeul}) {
  return(
    <span>
      {isDate && user.date}
      {isSubject && user.subject}
      {isInput && user.input}
      {isOutput && user.output}
      {isHangeul && user.hangeul}
    </span>
  );
}

const LogShowLine = styled.div`
  padding: 0.3rem 0px;
`

const DateStyle = styled.span`
  color: Red;
  font-size: small;
`

function ReturnDate() {
  return(
    <LogShowLine>
      <DateStyle>
        # 2019-02-13
      </DateStyle>
    </LogShowLine>
  )
}


const TitleStyle = styled.span`
  font-weight: bold;
`
const ContextStyle = styled.span`

`

function ReturnSubject() {
  return(
    <LogShowLine>
      <TitleStyle>질문: </TitleStyle>
      <ContextStyle>오늘 점심 뭐 먹었어?</ContextStyle>
    </LogShowLine>
  )
}

function ReturnInput() {
  return(
    <LogShowLine>
      <TitleStyle>나의영작: </TitleStyle>
      <ContextStyle>I drink water.</ContextStyle>
    </LogShowLine>
  )
}

function ReturnUserIntend() {
  return(
    <LogShowLine>
      <TitleStyle>나의의도: </TitleStyle>
      <ContextStyle>나는 물을 마셨다</ContextStyle>
    </LogShowLine>
  )
}

function ReturnOutput() {
  return(
    <LogShowLine>
      <TitleStyle>좋은영작: </TitleStyle>
      <ContextStyle>I drink water.</ContextStyle>
    </LogShowLine>
  )
}

function ReturnUserIntendTrans() {
  return(
    <LogShowLine>
      <TitleStyle>좋은해석: </TitleStyle>
      <ContextStyle>나는 물을 마셨다.</ContextStyle>
    </LogShowLine>
  )
}

const LogShowBlock = styled.div`
  padding: 0.5rem 0px;
`

{/* Swipe */}
const BindKey = bindKeyboard(SwipeableViews);

const PageStyle = styled.div`
  padding: 1rem;
  height: 22rem;
  color: black;

  background-color: #E4EFFF;
  z-index: 1;
  border-radius: 10px;
`

const Swipe = () => {
  return (
    <BindKey>
      <PageStyle>
        <ReturnDate />
        <ReturnSubject />
        <LogShowBlock>
          <ReturnInput />
          <ReturnUserIntend />
        </LogShowBlock>
        <LogShowBlock>
          <ReturnOutput />
          <ReturnUserIntendTrans/>
        </LogShowBlock>
      </PageStyle>
      <PageStyle>
        slide 2
      </PageStyle>
      <PageStyle>
        slide 3
      </PageStyle>
    </BindKey>
  )

};


{/* Rendering at DOM */}
const LogsPage = props => {
  
  return (
    <>
      <Header />
      <Main>
        <WholeBox>
          <SearchBox>
            <SearchInput></SearchInput>
            <SearchButtons>
              <img src={require("../icons/search.png")}/>
            </SearchButtons>
            <ClockButton />
          </SearchBox>
          <ShowBox>
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
