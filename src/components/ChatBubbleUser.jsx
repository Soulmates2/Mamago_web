import React, {useState} from 'react';
import styled from 'styled-components';


const BubbleBox = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  display:flex;
  font-family: sans-serif;
  font-size: 14px;
  align-items: center;
`

const Bubble = styled.div`
  background-color: #F2F2F2;
  border-radius: 5px;
  box-shadow: 0 0 6px #B2B2B2;
  display: block;
  padding: 10px 18px;
  position: relative;
  vertical-align: top;
  color: white;
  word-wrap: break-word;
`

const BubbleBefore = styled.div`
    background-color: #F2F2F2;
    content: "\00a0";
    display: block;
    height: 16px;
    position: absolute;
    top: 11px;
    transform:             rotate( 29deg ) skew( -35deg );
        -moz-transform:    rotate( 29deg ) skew( -35deg );
        -ms-transform:     rotate( 29deg ) skew( -35deg );
        -o-transform:      rotate( 29deg ) skew( -35deg );
        -webkit-transform: rotate( 29deg ) skew( -35deg );
    width:  20px;

`