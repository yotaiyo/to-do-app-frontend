import { sortTodos } from '../components/Todos';

const beforeCurrentTime1 = new Date(2019, 5, 18);
const beforeCurrentTime2 = new Date(2019, 5, 19);
const currentTime = new Date(2019, 5, 20);
const afterCurrentTime1 = new Date(2019, 5, 21);
const afterCurrentTime2 = new Date(2019, 5, 22);

const todo0 = { id: 0, completed: false, deadline: null, title: 'todo0' };
const todo1 = {
  id: 1,
  completed: false,
  deadline: beforeCurrentTime1,
  title: 'todo1'
};
const todo2 = {
  id: 2,
  completed: false,
  deadline: beforeCurrentTime2,
  title: 'todo2'
};
const todo3 = {
  id: 3,
  completed: false,
  deadline: afterCurrentTime1,
  title: 'todo3'
};
const todo4 = {
  id: 4,
  completed: false,
  deadline: afterCurrentTime2,
  title: 'todo4'
};
const todo5 = { id: 5, completed: true, deadline: null, title: 'todo5' };
const todo6 = {
  id: 6,
  completed: true,
  deadline: beforeCurrentTime1,
  title: 'todo6'
};
const todo7 = {
  id: 7,
  completed: true,
  deadline: afterCurrentTime1,
  title: 'todo7'
};

describe('Todosに対するソートロジックのテスト', () => {
  it('sort-test1', () => {
    const input = [todo0, todo2, todo1, todo3, todo4, todo5, todo6, todo7];
    const expected = [todo3, todo4, todo0, todo2, todo1, todo5, todo6, todo7];

    const sortedTodos = sortTodos(input, currentTime);

    expect(sortedTodos).toEqual(expected);
  });

  it('sort-test2', () => {
    const input = [todo0, todo1, todo2, todo3, todo4, todo6, todo5, todo7];
    const expected = [todo3, todo4, todo0, todo1, todo2, todo6, todo5, todo7];

    const sortedTodos = sortTodos(input, currentTime);

    expect(sortedTodos).toEqual(expected);
  });

  it('sort-test3', () => {
    const input = [todo3, todo7, todo5, todo4, todo1, todo0, todo6, todo2];
    const expected = [todo3, todo4, todo0, todo1, todo2, todo7, todo5, todo6];

    const sortedTodos = sortTodos(input, currentTime);

    expect(sortedTodos).toEqual(expected);
  });
});
