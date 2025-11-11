import { useState, useMemo } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  const addTask = (text) => {
    const newTask = { id: uid(), text: text.trim(), completed: false }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <>
      {/* Hidden checkbox toggle for hamburger menu */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-hidden="true" />

      {/* HEADER */}
      <header className="main-header" role="banner">
        <div className="header-left">
          <label htmlFor="menu-toggle" className="hamburger" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </label>

          <form className="quick-find" role="search" aria-label="Quick find">
            <img src="/assets/search_icon.png" alt="" className="icon" />
            <input type="text" placeholder="Quick find" aria-label="Quick find" />
          </form>
        </div>
        <div className="task-counter" aria-label="Tasks complete / today">
          <span className="counter-check"></span>
          <span>{completedCount}/{tasks.length}</span>
        </div>
      </header>

      {/* APP LAYOUT */}
      <div className="app">
        {/* SIDEBAR */}
        <aside className="sidebar" aria-label="Left navigation">
          <nav>
            <ul className="side-nav">
              <li>
                <a href="#" className="active">
                  <img src="/assets/inbox_icon.png" alt="" className="icon" />
                  <span className="label">
                    <span className="item-text">Inbox</span>
                    <span className="count">{tasks.length}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/calendar_icon.png" alt="" className="icon" />
                  <span className="label">
                    <span className="item-text">Today</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/upcoming_icon.png" alt="" className="icon" />
                  <span className="label">
                    <span className="item-text">Upcoming</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
  <header className="content-header">
    <h1>Inbox</h1>
  </header>

  {/* === Add Task Form === */}
  <TaskForm onAddTask={addTask} />

  {/* === Task Filter Buttons === */}
  <div className="filters">
    <button
      className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
      onClick={() => setFilter('all')}
    >
      All
    </button>
    <button
      className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
      onClick={() => setFilter('active')}
    >
      Active
    </button>
    <button
      className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
      onClick={() => setFilter('completed')}
    >
      Completed
    </button>
  </div>

  {/* === Task List / Empty Message === */}
  {filteredTasks.length === 0 ? (
    <p className="empty-state">No tasks to show.</p>
  ) : (
    <TaskList
      tasks={filteredTasks}
      onToggle={toggleTask}
      onDelete={deleteTask}
    />
  )}
</main>

      </div>
    </>
  )
}
