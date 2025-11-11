import { useState } from 'react'

export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const clean = text.trim()
    if (!clean) return
    onAddTask(clean)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn add-btn" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}
