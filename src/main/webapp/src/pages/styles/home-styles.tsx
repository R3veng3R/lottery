import styled from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BodyContainer = styled.section`
  position: relative;
  padding: 1rem;
  display: flex;
  border: 1px solid red;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  min-height: calc(100vh - 45px);
  
  .margin-right-5 {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 1rem;
  margin-bottom: 2.2rem;
  border: 1px solid rgba(206,206,206,0.35);
  border-radius: .5rem;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  background-color: #fff;
  width: 48%;
  
    
  &:first-child {
     margin-right: 5px;
  }
`;

export const Input = styled.input`
  border: 1px solid #d9d9d9;
  padding: .6rem;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
  
  width: 50%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
`;

export const Label = styled.label`
  color: #808080;
  line-height: 1.5rem;
  
  &.margin-bot-5 {
    margin-bottom: 5px;
  }
`;