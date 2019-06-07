import React from 'react'
import styled from 'styled-components'
import { TodoType } from '../pages/ToDoScreen'

const currentTime = new Date()

// 締切が近いもの=>締切が遅いもの=>締切が設定されていないもの=>締切が終了したもの=>完了したものの順にソートする
export const sortTodos = (todoList: TodoType[], currentTime: Date) => {
    const normalTodos: TodoType[] = []
    const beforeDeadlineTodos: TodoType[] = []
    const afterDeadlineTodos: TodoType[] = []
    const completedTodos: TodoType[] = []
  
    todoList.forEach(todo => {
        const { deadline, completed } = todo
  
        if (!deadline && !completed) {
            normalTodos.push(todo)
        } else if (deadline && !completed) {
            new Date(currentTime) < new Date(deadline) ? beforeDeadlineTodos.push(todo) : afterDeadlineTodos.push(todo)
        } else {
            completedTodos.push(todo)
        }
    })
  
    beforeDeadlineTodos.sort((a,b) => {
        if (a.deadline && b.deadline) {
            return new Date(a.deadline) > new Date(b.deadline) ? 1 : -1
        } else {
            return -1
        }
    })


    console.log('BBBBBBBBBBBBBBBB')
    console.log(beforeDeadlineTodos)
    console.log(normalTodos)
    console.log(afterDeadlineTodos)
    console.log(completedTodos)
  
    return beforeDeadlineTodos.concat(normalTodos).concat(afterDeadlineTodos).concat(completedTodos)
}

interface TodosType {
    todoList: TodoType[]
    onClickCheckButton: ({ id, completed }: {id?: number, completed: boolean, deadline: Date | null}) => void
    showOnlyCompleted: boolean
    showOnlyActive: boolean
    showSortedTodos: boolean
}

const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 20px;
    width: 600px;
    font-size: 20px;
`

const TodoCard = styled.div`
    border-left: solid 1px #CCCCCC;
    border-right: solid 1px #CCCCCC;
    border-bottom: solid 1px #CCCCCC;
    text-align: left;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
`

const TodoBody = styled.div`
    font-size: 20px;
`

const ToggleButton = styled.img`
    margin: 0 0 0 auto;
    width: 15px;
    height: 15px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-left: solid 1px #CCCCCC;
`

const DeadlineCardWrapper = styled.div`
    font-size: 12px;
    margin-top: 7px;
    margin-bottom: 5px;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    border-radius: 5px;
    box-shadow:0px 0px 3px 0.5px #C0C0C0;
`

interface DeadlineCardType {
    currentTime: Date
    deadline: Date
}

const DeadlineCard = ({ currentTime, deadline } : DeadlineCardType ) => {
    if (currentTime > new Date(deadline)) {
        return <DeadlineCardWrapper>締切は終了しました。</DeadlineCardWrapper>
    } 
    return <DeadlineCardWrapper>{deadline}まで</DeadlineCardWrapper>
}

export const Todos = ({ todoList, onClickCheckButton, showOnlyCompleted, showOnlyActive, showSortedTodos }: TodosType) => {
    let listNum = 0
    if (todoList.length === 0) {
        return <Wrapper>Todoはありません。</Wrapper>
    }

    const sortedTodoList = showSortedTodos ? sortTodos(todoList, currentTime) : null
    const todos = sortedTodoList || todoList
    return(
        <Wrapper>
            {todos.map((todo) => {
                const { id, title, completed, deadline } = todo
                const showCompleted = showOnlyCompleted ? completed : true
                const showActive = showOnlyActive ? !completed : true 
                const show = showCompleted && showActive
                listNum += show ? 1 : 0 

                return (
                    show ?
                        <TodoCard key={listNum} style={{ borderTop: listNum === 1 ? 'solid 1px #CCCCCC' : undefined }}>
                            <TodoBody style={{ textDecoration: completed ? 'line-through' : undefined }}>{title}</TodoBody>
                            {deadline ? <DeadlineCard currentTime={currentTime} deadline={deadline}/> : <div />}
                            <ToggleButton 
                                src={completed ? require('../public/images/check-black.png') : require('../public/images/check-gray.png')} 
                                alt='check'
                                onClick={() => onClickCheckButton({ id, completed, deadline })}
                            />
                        </TodoCard>
                    : <div key={id} />
                )
            })} 
        </Wrapper>
    )
}