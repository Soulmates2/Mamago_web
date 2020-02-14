import React, { useState, useEffect } from 'react';
import cookies from 'js-cookie';
import * as R from 'ramda';
import styled from 'styled-components';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { login, signup } from '../actions/users';
import { validateEmail, validatePassword } from '../services/util';
import { useHistory } from 'react-router';

const BlockHeader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleHeader = styled.div`
  text-align: center;
`;

const TextHeader = styled.span`
  font-weight: bold;
  font-size: 25px;
  line-height: 60px;
  vertical-algin: middle;
`;

const ImageHeader = styled.img`
  width: 60px;
  height: 60px;
  vertical-align: middle;
`;

const LoginInput = styled.input`
  width: 300px;
  height: 30px;
  font-size: 15px;
  margin-top: 10px;
  outline: 1px solid black;
`;

const ButtonHeader = styled.button`
  width: 304px;
  height: 50px;
  margin-top: 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  text-aling: center;
  display: inline-block;
  font-size: 16px;
`;

function SignupPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onChange = type => e => {
    e.preventDefault();
    switch (type) {
      case 'email':
        return setEmail(e.target.value);
      case 'password':
        return setPassword(e.target.value);
      case 'passwordConfirmation':
        return setPasswordConfirmation(e.target.value);
      default:
        return;
    }
  };

  const onClick = e => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      if (password === passwordConfirmation) {
        dispatch(
          signup({
            email: email,
            password: password,
            afterSuccess: () => {
              history.push('/');
            }
          })
        );
      } else {
        alert('패스워드가 다릅니다.');
      }
    }
  };

  return (
    <>
      <BlockHeader>
        <TitleHeader>
          <ImageHeader src={require('../images/mamago_logo.png')} />
          <TextHeader>Mamago</TextHeader>
        </TitleHeader>
        <LoginInput
          name="email"
          placeholder="이메일"
          onChange={onChange('email')}
          value={email}
          type="email"
        />
        <LoginInput
          name="password"
          placeholder="비밀번호"
          onChange={onChange('password')}
          value={password}
          type="password"
        />
        <LoginInput
          name="password"
          placeholder="비밀번호 확인"
          onChange={onChange('passwordConfirmation')}
          value={passwordConfirmation}
          type="password"
        />
        <div>
          <ButtonHeader onClick={onClick}>가입하기</ButtonHeader>
        </div>
      </BlockHeader>
    </>
  );
}

export default SignupPage;
