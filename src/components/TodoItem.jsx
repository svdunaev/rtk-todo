import React from 'react'

export default function TodoItem({id, text, completed}) {
	return (
		<li>
			<input type='checkbox' defaultChecked={completed} />
			<span>{text}</span>
			<span>&times;</span>
		</li>
	)
}
