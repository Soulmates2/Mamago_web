import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import Calendar from 'react-calendar';
import '../font.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDialogs } from '../actions/dialogs';

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
`;

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
`;

const CalendarModal = props => {
  // Modal
  const [display, setDisplay] = useState(false);
  const [day, setDay] = useState(new Date());

  const onClickOpen = e => {
    e.preventDefault();
    setDisplay(true);
  };

  const onClickClose = e => {
    e.preventDefault();
    setDisplay(false);
  };

  const onDateChange = date => setDay(date);

  const confirmDate = e => {
    e.preventDefault();
    setDisplay(false);
  };

  return (
    <>
      <ClockButtons type="button" onClick={onClickOpen}>
        <img src={require('../icons/clock.png')} />
      </ClockButtons>
      <ModalWapper display={display}>
        <Modal>
          <ModalTitle>타임머신</ModalTitle>
          <Calendar onChange={onDateChange} value={day} />
          <CloseWrapper>
            <CalendarClose onClick={onClickClose}>취소</CalendarClose>
            <CalendarSelect onClick={confirmDate}>선택</CalendarSelect>
            {/* <b>value: {day}</b> */}
          </CloseWrapper>
        </Modal>
      </ModalWapper>
    </>
  );
};

{
  /* Parsing Databaset datasets and Showing */
}

const DialogView = ({ dialog = {} }) => {
  return (
    <>
      <PageStyle>
        <ReturnDate value={dialog.created_at} />
        <LogShowBlock>
          <BubbleLeft>
            <ReturnSubject value={dialog.question} />
          </BubbleLeft>
        </LogShowBlock>
        <LogShowBlock>
          <BubbleRight>
            <ReturnInput value={dialog.original} />
          </BubbleRight>
          <BubbleLeft>
            <ReturnUserIntend value={dialog.translated} />
          </BubbleLeft>
        </LogShowBlock>
        {dialog.feedback ? (
          <LogShowBlock>
            <BubbleRight>
              <ReturnOutput value={dialog.user_intention} />
            </BubbleRight>
            <BubbleLeft>
              <ReturnUserIntendTrans value={dialog.user_intention_translated} />
            </BubbleLeft>
          </LogShowBlock>
        ) : (
          <LogShowBlock>
            <BubbleLeft>
              <LogShowLine>
                <TitleStyle>잘했어요!</TitleStyle>
              </LogShowLine>
            </BubbleLeft>
          </LogShowBlock>
        )}
      </PageStyle>
    </>
  );
};

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

function ReturnDate({ value }) {
  return <DateStyle>{value}</DateStyle>;
}

const TitleStyle = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;
const ContextStyle = styled.span`
  font-size: 0.9rem;
`;

function ReturnSubject({ value }) {
  return (
    <LogShowLine>
      <TitleStyle>질문: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnInput({ value }) {
  return (
    <LogShowLine>
      <TitleStyle>나의영작: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnUserIntend({ value }) {
  return (
    <LogShowLine>
      <TitleStyle>마마고의 이해: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnOutput({ value }) {
  return (
    <LogShowLine>
      <TitleStyle>나의 의도: </TitleStyle>
      <ContextStyle>{value}</ContextStyle>
    </LogShowLine>
  );
}

function ReturnUserIntendTrans({ value }) {
  return (
    <LogShowLine>
      <TitleStyle>좋은 영작: </TitleStyle>
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
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

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
    content: '';
    position: absolute;
    border-style: solid;

    /* reduce the damage in FF3.0 */
    display: block;
    width: 0;

    top: 1rem;
    right: -1.3rem; /* value = - border-left-width - border-right-width */
    bottom: auto;
    left: auto;
    border-width: 1rem 0 0 1.5rem; /* vary these values to change the angle of the vertex */
    border-color: transparent #ffd966;
  }
`;

const BubbleLeft = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 30px;

  margin-left: 2rem;
  margin-right: 4rem;
  background: #d1c4e9;
  z-index: 2;

  :after {
    content: '';
    position: absolute;
    border-style: solid;
    /* reduce the damage in FF3.0 */
    display: block;
    width: 0;

    top: 1rem;
    left: -1.3rem; /* value = - border-left-width - border-right-width */
    bottom: auto;
    border-width: 1rem 1.5rem 0 0; /* vary these values to change the angle of the vertex */
    border-color: transparent #d1c4e9;
    z-index: 1;
  }
`;

{
  /* Swipe Button */
}
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
`;

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
`;

const Swipe = ({ dialogs }) => {
  const maxIndex = useMemo(() => dialogs.length, [dialogs]);
  const [dialogIndex, setDialogIndex] = useState(0);

  const onClickLeft = () => {
    setDialogIndex(prev => (prev !== 0 ? prev - 1 : prev));
  };

  const onClickRight = () => {
    setDialogIndex(prev => (prev !== maxIndex - 1 ? prev + 1 : prev));
  };

  const dialogViewRenderer = ({ index, key }) => {
    return <DialogView dialog={dialogs[index]} key={key} />;
  };
  return (
    <>
      <VirtualizeSwipeableViews
        index={dialogIndex}
        slideRenderer={dialogViewRenderer}
        slideCount={dialogs.length}
      />
      {dialogIndex !== 0 && (
        <SwipeButtonLeft onClick={onClickLeft}>
          <img src={require('../icons/before.png')} />
        </SwipeButtonLeft>
      )}
      {dialogIndex !== dialogs.length - 1 && (
        <SwipeButtonRight onClick={onClickRight}>
          <img src={require('../icons/next.png')} />
        </SwipeButtonRight>
      )}
    </>
  );
};

{
  /* Large show box - for button operation */
}

const LargeShowBox = () => {
  const onClickLeft = e => {
    console.log('click left');
  };

  const onClickRight = e => {
    console.log('click right');
  };

  return (
    <ShowBox>
      <SwipeButtonLeft onClick={onClickLeft}>
        <img src={require('../icons/before.png')} />
      </SwipeButtonLeft>
      <SwipeButtonRight onClick={onClickRight}>
        <img src={require('../icons/next.png')} />
      </SwipeButtonRight>
      <Swipe />
    </ShowBox>
  );
};

{
  /* Rendering at DOM */
}
const LogsPage = props => {
  const dispatch = useDispatch();
  const dialogs = useSelector(state => state.dialogs);

  const [localDialogs, setLocalDialogs] = useState([]);

  useEffect(() => {
    dispatch(fetchUserDialogs());
  }, []);

  useEffect(() => {
    setLocalDialogs(dialogs);
  }, [dialogs]);

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
            <CalendarModal />
          </SearchBox>
          <ShowBox>
            <Swipe dialogs={localDialogs} />
          </ShowBox>
        </WholeBox>
      </Main>
    </>
  );
};

export default LogsPage;
