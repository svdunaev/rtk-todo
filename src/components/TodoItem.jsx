import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../store/todoSlice'

export default function TodoItem({id, text, completed}) {
	const dispatch = useDispatch();

	return (
		<li>
			<input type='checkbox' defaultChecked={completed} />
			<span>{text}</span>
			<span onClick={() => dispatch(deleteTodo(id))} >&times;</span>
		</li>
	)
}
