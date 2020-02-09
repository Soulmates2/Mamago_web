import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';

const IntroPage = props => {
  return (
    <>
      <Header />
      <Main>
        <div>인공지능과 어디서나 언제든지!</div>
        <div>하루 10분으로 영어 실력을 키워요!</div>
      </Main>
    </>
  );
};

export default IntroPage;
