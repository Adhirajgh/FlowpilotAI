import { useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

type Status = "In progress" | "In review" | "Complete";

type Task = {
  id: number;
  title: string;
  project: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  status: Status;
  initials: string[];
  color: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Refine the onboarding journey",
    project: "Website redesign",
    due: "Today",
    priority: "High",
    status: "In progress",
    initials: ["AP", "MK"],
    color: "purple",
  },
  {
    id: 2,
    title: "Create the product launch assets",
    project: "Q3 campaign",
    due: "Tomorrow",
    priority: "Medium",
    status: "In progress",
    initials: ["AP", "JL"],
    color: "orange",
  },
  {
    id: 3,
    title: "Approve new brand direction",
    project: "Brand evolution",
    due: "Jun 26",
    priority: "High",
    status: "In review",
    initials: ["MK", "JL"],
    color: "pink",
  },
  {
    id: 4,
    title: "Prepare customer interview notes",
    project: "Research",
    due: "Jun 28",
    priority: "Low",
    status: "In review",
    initials: ["AP"],
    color: "blue",
  },
  {
    id: 5,
    title: "Publish the June product update",
    project: "Product marketing",
    due: "Completed",
    priority: "Low",
    status: "Complete",
    initials: ["JL", "AP"],
    color: "green",
  },
];

const columns: Status[] = ["In progress", "In review", "Complete"];

export function ProjectsPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<"board" | "list">("board");

  function addTask() {
    const title = window.prompt("What needs to be done?");

    if (!title?.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        project: "FlowPilot workspace",
        due: "This week",
        priority: "Medium",
        status: "In progress",
        initials: ["AP"],
        color: "purple",
      },
    ]);
  }

  function completeTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status: "Complete", due: "Completed" } : task,
      ),
    );
  }

  return (
    <section className="projects-page">
      <div className="projects-hero">
        <div>
          <p>WORKSPACE / PROJECTS</p>
          <h1>Projects in motion.</h1>
          <span>Keep every idea, task, and milestone moving forward.</span>
        </div>

        <button className="new-project-button" onClick={addTask}>
          <Plus size={17} />
          New task
        </button>
      </div>

      <div className="projects-toolbar">
        <div className="project-tabs">
          <button className="active">All projects <b>12</b></button>
          <button>My tasks <b>5</b></button>
          <button>Recently completed</button>
        </div>

        <div className="project-tools">
          <button className="project-search">
            <Search size={15} />
            Search tasks
          </button>
          <button className="view-toggle" onClick={() => setView("board")}>
            <Grid2X2 size={16} className={view === "board" ? "active-icon" : ""} />
          </button>
          <button className="view-toggle" onClick={() => setView("list")}>
            <List size={17} className={view === "list" ? "active-icon" : ""} />
          </button>
        </div>
      </div>

      {view === "board" ? (
        <div className="kanban-board">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column);

            return (
              <div className="kanban-column" key={column}>
                <div className="column-title">
                  <div>
                    <span className={`status-dot ${column.toLowerCase().replace(" ", "-")}`} />
                    <b>{column}</b>
                    <small>{columnTasks.length}</small>
                  </div>
                  <button><MoreHorizontal size={18} /></button>
                </div>

                <div className="task-stack">
                  {columnTasks.map((task) => (
                    <article className="kanban-task" key={task.id}>
                      <div className="task-card-top">
                        <span className={`project-badge ${task.color}`}>
                          {task.project.charAt(0)}
                        </span>
                        <button><MoreHorizontal size={16} /></button>
                      </div>

                      <h3>{task.title}</h3>
                      <p>{task.project}</p>

                      <div className="task-card-bottom">
                        <span className={`priority ${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>

                        <div className="task-meta">
                          <span><CalendarDays size={13} /> {task.due}</span>
                          <div className="avatar-stack">
                            {task.initials.map((initial, index) => (
                              <i key={initial + index}>{initial}</i>
                            ))}
                          </div>
                        </div>
                      </div>

                      {task.status !== "Complete" && (
                        <button
                          className="complete-task"
                          onClick={() => completeTask(task.id)}
                        >
                          <Check size={14} />
                          Mark complete
                        </button>
                      )}
                    </article>
                  ))}
                </div>

                <button className="add-to-column" onClick={addTask}>
                  <Plus size={15} /> Add task
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="projects-list">
          {tasks.map((task) => (
            <div className="list-task" key={task.id}>
              <span className={`project-badge ${task.color}`}>
                {task.project.charAt(0)}
              </span>
              <div>
                <b>{task.title}</b>
                <small>{task.project}</small>
              </div>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className="list-status">{task.status}</span>
              <span>{task.due}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}