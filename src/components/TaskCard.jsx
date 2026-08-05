export default function TaskCard({ title, assignee, dueDate }) {
    return(
        <article className="task-card">
            <h3>{title}</h3>
            <p>
                {assignee} · Due {dueDate}
            </p>
        </article>
    )
}