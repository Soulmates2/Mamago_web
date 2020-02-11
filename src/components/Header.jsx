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

const Header = props => {
  const { children } = props;
  return (
    <StyledHeader>
      Header
      {children}
    </StyledHeader>
  );
};

export default Header;
