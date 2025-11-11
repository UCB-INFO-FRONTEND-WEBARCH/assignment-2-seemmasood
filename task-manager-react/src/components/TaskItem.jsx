export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <label className={`task ${task.completed ? 'task--completed' : ''}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <span className="custom-check" aria-hidden="true">
          <img src="assets/check_icon.png" alt="" />
        </span>
        <span className="task-text">{task.text}</span>
      </label>
      <button className="btn delete-btn" onClick={onDelete}>
        ✕
      </button>
    </li>
  )
}
