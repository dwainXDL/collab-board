import TaskCard from './components/TaskCard'

function App() {
  return (
    <main>
      <h1>CollabBoard</h1>
      <TaskCard title="Design the login screen" assignee="Nimali" dueDate="Friday" />
      <TaskCard title="Set up the repo" assignee="You" dueDate="Today" />
    </main>
  )
}

export default App