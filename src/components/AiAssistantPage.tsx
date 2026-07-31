import { useState } from "react";
import {
  ArrowUp,
  Bot,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderKanban,
  Send,
  Sparkles,
} from "lucide-react";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const starterMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Good morning, Adhiraj. I’ve reviewed your workspace activity. Two projects need attention today, and your team is moving 12% faster than last week.",
  },
];

const suggestions = [
  "What needs my attention today?",
  "Summarize this week’s project activity",
  "Draft a team update for Slack",
];

export function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");

  function createResponse(text: string) {
    const query = text.toLowerCase();

    if (query.includes("attention") || query.includes("priority")) {
      return "Your highest-priority item is refining the onboarding journey, due today. The brand direction is also waiting for review before the Q3 campaign can move ahead.";
    }

    if (query.includes("summarize") || query.includes("week")) {
      return "This week, your team completed the June product update, moved the onboarding flow into its final refinement stage, and created the first launch assets for Q3. Overall velocity is up 12.4%.";
    }

    if (query.includes("slack") || query.includes("update")) {
      return "Here’s a draft: “Quick team update: onboarding refinement is our main focus today, the brand direction is in review, and Q3 launch assets are progressing well. Great momentum this week—thank you, team.”";
    }

    return "I can help you turn workspace activity into clear next steps. Try asking about project priorities, team progress, or a quick update for your team.";
  }

  function sendMessage(text = input) {
    const cleanText = text.trim();

    if (!cleanText) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: cleanText,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: createResponse(cleanText),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  }

  return (
    <section className="ai-page">
      <div className="ai-page-heading">
        <div>
          <p>FLOWPILOT INTELLIGENCE</p>
          <h1>Your work, made clear.</h1>
          <span>Ask questions, unblock projects, and move forward with confidence.</span>
        </div>

        <div className="ai-status">
          <span />
          Workspace context connected
        </div>
      </div>

      <div className="ai-workspace">
        <article className="ai-chat-panel">
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <Sparkles size={18} />
            </div>

            <div>
              <b>FlowPilot AI</b>
              <span>Connected to Aster Studio</span>
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((message) => (
              <div
                className={`message-row ${message.role}`}
                key={message.id}
              >
                {message.role === "assistant" && (
                  <span className="message-avatar">
                    <Bot size={15} />
                  </span>
                )}

                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <div className="ai-suggestions">
            <span>TRY ASKING</span>

            <div>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                >
                  <Sparkles size={13} />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-composer">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Ask FlowPilot anything..."
            />

            <button onClick={() => sendMessage()} aria-label="Send message">
              <ArrowUp size={18} />
            </button>
          </div>

          <small className="ai-note">
            FlowPilot AI can make mistakes. Check important information.
          </small>
        </article>

        <aside className="ai-context-panel">
          <div className="context-heading">
            <span>LIVE CONTEXT</span>
            <b>Workspace pulse</b>
          </div>

          <div className="context-stat">
            <span className="context-icon purple">
              <FolderKanban size={17} />
            </span>

            <div>
              <small>Active projects</small>
              <b>12 in motion</b>
            </div>

            <em>↑ 18%</em>
          </div>

          <div className="context-stat">
            <span className="context-icon orange">
              <CalendarDays size={17} />
            </span>

            <div>
              <small>Due this week</small>
              <b>8 tasks</b>
            </div>

            <em>3 urgent</em>
          </div>

          <div className="context-stat">
            <span className="context-icon green">
              <CheckCircle2 size={17} />
            </span>

            <div>
              <small>Completed this week</small>
              <b>24 tasks</b>
            </div>

            <em>↑ 12%</em>
          </div>

          <div className="context-divider" />

          <div className="context-heading">
            <span>RECENTLY REFERENCED</span>
            <b>Helpful context</b>
          </div>

          <button className="context-document">
            <span><FileText size={16} /></span>
            <div>
              <b>Q3 launch strategy</b>
              <small>Updated 2 hours ago</small>
            </div>
          </button>

          <button className="context-document">
            <span><FolderKanban size={16} /></span>
            <div>
              <b>Website redesign</b>
              <small>78% complete</small>
            </div>
          </button>

          <div className="context-tip">
            <Sparkles size={15} />
            <p>FlowPilot uses your projects, tasks, and documents to give more useful answers.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}