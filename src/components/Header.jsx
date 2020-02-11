import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  height: 40px;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  background-color: ${props => (props.danger ? 'red' : 'purple')};
`;

const FontsHeader = styled.span`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  vertical-align: middle;
  margin-top: auto;
  margin-bottom: auto;
  align-content: center;
  @font-face {
    font-family: "08SeoulNamsanM";
    font-weight: 600;
    src: url("../fonts/08SeoulNamsanM.ttf") format("truetype");
  }
`

const Logo = styled.img`
  width 40px;
  height 40px;
  vertical-align: middle;
`;

const Header = props => {
  const { children } = props;
  return (
      <StyledHeader>
        <nav> 
          <span>
            <Logo src={require("../images/main_icon.png")}></Logo>
            <FontsHeader>Mamago</FontsHeader>
          </span>
          <span>
            <button onClick src={require("../icons/menu.png")}></button>
          </span>
        </nav>
        {children}
      </StyledHeader>
  );
};

export default Header;
