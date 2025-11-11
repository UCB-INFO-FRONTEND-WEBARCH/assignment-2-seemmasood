export default function TaskCounter({ total, completed, filtered, filter }) {
  return (
    <span>
      {filter === 'all'
        ? `${completed}/${total}`
        : `${filtered} of ${total}`}
    </span>
  )
}
