import React from 'react';
import styled from 'styled-components';
import { TodoType } from '../pages/ToDoScreen';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const SquereButton = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  border-top: solid 1px #cccccc;
  border-bottom: solid 1px #cccccc;
  border-left: solid 1px #cccccc;
  font-size: 20px;
`;

const CircleButton = styled.img`
  width: 18px;
  height: 18px;
  padding: 5px;
  border-radius: 70px;
  box-shadow: 0px 0px 3px 2px #c0c0c0;
  margin-left: 50px;
  margin-top: 5px;
`;

interface FooterType {
  onClickAll: () => void;
  onClickCompleted: () => void;
  onClickActive: () => void;
  showOnlyCompleted: boolean;
  showOnlyActive: boolean;
  onClickDeleteButton: (todoList: TodoType[]) => void;
  onClickSort: () => void;
  todoList: TodoType[];
  showOnlySorted: boolean;
}

export const Footer = ({
  onClickAll,
  onClickCompleted,
  onClickActive,
  showOnlyCompleted,
  showOnlyActive,
  onClickDeleteButton,
  onClickSort,
  todoList,
  showOnlySorted
}: FooterType) => {
  return (
    <Wrapper>
      <SquereButton
        style={{
          backgroundColor:
            !showOnlyCompleted && !showOnlyActive && !showOnlySorted
              ? '#EEEEEE'
              : undefined
        }}
        onClick={onClickAll}
      >
        All
      </SquereButton>
      <SquereButton
        style={{ backgroundColor: showOnlyCompleted ? '#EEEEEE' : undefined }}
        onClick={onClickCompleted}
      >
        Completed
      </SquereButton>
      <SquereButton
        style={{
          backgroundColor: showOnlyActive ? '#EEEEEE' : undefined,
          borderRight: 'solid 1px #CCCCCC'
        }}
        onClick={onClickActive}
      >
        Active
      </SquereButton>
      <SquereButton
        style={{
          backgroundColor: showOnlySorted ? '#EEEEEE' : undefined,
          borderRight: 'solid 1px #CCCCCC'
        }}
        onClick={onClickSort}
      >
        Sorted
      </SquereButton>
      <CircleButton
        src={require('../public/images/delete.png')}
        alt="delete"
        onClick={() => onClickDeleteButton(todoList)}
      />
    </Wrapper>
  );
};
