import { useState } from "react";
import {
  Clock3,
  FileText,
  Folder,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

type Document = {
  id: number;
  title: string;
  description: string;
  updated: string;
  owner: string;
  color: "purple" | "orange" | "blue" | "green";
  favorite?: boolean;
};

const starterDocuments: Document[] = [
  {
    id: 1,
    title: "Q3 launch strategy",
    description: "Goals, messaging, milestones, and launch plan.",
    updated: "Updated 2 hours ago",
    owner: "AP",
    color: "purple",
    favorite: true,
  },
  {
    id: 2,
    title: "Website redesign brief",
    description: "A clear direction for our next website experience.",
    updated: "Updated yesterday",
    owner: "MK",
    color: "blue",
  },
  {
    id: 3,
    title: "Customer interview insights",
    description: "Research patterns, quotes, and product opportunities.",
    updated: "Updated Jun 21",
    owner: "JL",
    color: "orange",
    favorite: true,
  },
  {
    id: 4,
    title: "Team operating principles",
    description: "How Aster Studio makes decisions and moves together.",
    updated: "Updated Jun 18",
    owner: "AP",
    color: "green",
  },
];

const folders = [
  { name: "Product", files: 14, color: "purple" },
  { name: "Marketing", files: 9, color: "orange" },
  { name: "Research", files: 18, color: "blue" },
  { name: "Operations", files: 7, color: "green" },
];

export function DocumentsPage() {
  const [documents, setDocuments] = useState(starterDocuments);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [listView, setListView] = useState(false);

  const visibleDocuments =
    activeTab === "favorites"
      ? documents.filter((document) => document.favorite)
      : documents;

  function addDocument() {
    const title = window.prompt("Name your new document");

    if (!title?.trim()) return;

    setDocuments((current) => [
      {
        id: Date.now(),
        title,
        description: "A new workspace document, ready for your ideas.",
        updated: "Created just now",
        owner: "AP",
        color: "purple",
      },
      ...current,
    ]);
  }

  function toggleFavorite(id: number) {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? { ...document, favorite: !document.favorite }
          : document,
      ),
    );
  }

  return (
    <section className="documents-page">
      <div className="documents-heading">
        <div>
          <p>WORKSPACE / DOCUMENTS</p>
          <h1>Everything your team knows.</h1>
          <span>Bring ideas, decisions, and shared context into one place.</span>
        </div>

        <button className="document-create" onClick={addDocument}>
          <Plus size={17} />
          New document
        </button>
      </div>

      <div className="documents-toolbar">
        <div className="document-tabs">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All documents <b>{documents.length}</b>
          </button>

          <button
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites <b>{documents.filter((document) => document.favorite).length}</b>
          </button>
        </div>

        <div className="document-tools">
          <button className="document-search">
            <Search size={15} />
            Search documents
          </button>

          <button
            className={`document-view-toggle ${!listView ? "active-view" : ""}`}
            onClick={() => setListView(false)}
          >
            <Grid2X2 size={16} />
          </button>

          <button
            className={`document-view-toggle ${listView ? "active-view" : ""}`}
            onClick={() => setListView(true)}
          >
            <List size={17} />
          </button>
        </div>
      </div>

      <div className="folders-section">
        <div className="section-title">
          <div>
            <p>FOLDERS</p>
            <h2>Browse by team</h2>
          </div>

          <button>View all</button>
        </div>

        <div className="folder-grid">
          {folders.map((folder) => (
            <button className="folder-card" key={folder.name}>
              <span className={`folder-icon ${folder.color}`}>
                <Folder size={20} />
              </span>

              <div>
                <b>{folder.name}</b>
                <small>{folder.files} documents</small>
              </div>

              <MoreHorizontal size={17} />
            </button>
          ))}
        </div>
      </div>

      <div className="documents-content">
        <div className="section-title">
          <div>
            <p>{activeTab === "favorites" ? "FAVORITES" : "RECENT DOCUMENTS"}</p>
            <h2>{activeTab === "favorites" ? "Quick access" : "Keep the momentum"}</h2>
          </div>

          <button><Clock3 size={14} /> Recently updated</button>
        </div>

        {listView ? (
          <div className="documents-list">
            {visibleDocuments.map((document) => (
              <article className="document-list-row" key={document.id}>
                <span className={`document-file-icon ${document.color}`}>
                  <FileText size={17} />
                </span>

                <div>
                  <b>{document.title}</b>
                  <small>{document.description}</small>
                </div>

                <span>{document.updated}</span>
                <span className="document-owner">{document.owner}</span>

                <button onClick={() => toggleFavorite(document.id)}>
                  <Star
                    size={16}
                    fill={document.favorite ? "#f0ab4e" : "none"}
                    color={document.favorite ? "#f0ab4e" : "#9a96a2"}
                  />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="document-grid">
            {visibleDocuments.map((document) => (
              <article className="document-card" key={document.id}>
                <div className="document-card-top">
                  <span className={`document-file-icon ${document.color}`}>
                    <FileText size={18} />
                  </span>

                  <button onClick={() => toggleFavorite(document.id)}>
                    <Star
                      size={17}
                      fill={document.favorite ? "#f0ab4e" : "none"}
                      color={document.favorite ? "#f0ab4e" : "#9a96a2"}
                    />
                  </button>
                </div>

                <h3>{document.title}</h3>
                <p>{document.description}</p>

                <div className="document-card-footer">
                  <span><Clock3 size={13} /> {document.updated}</span>
                  <i>{document.owner}</i>
                </div>

                <button className="document-ai-action">
                  <Sparkles size={13} />
                  Summarize with AI
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="documents-ai-banner">
        <span><Sparkles size={19} /></span>
        <div>
          <b>Turn scattered knowledge into your team’s advantage.</b>
          <p>Ask FlowPilot AI to summarize a document, find a decision, or turn notes into action.</p>
        </div>
        <button>
          Ask FlowPilot AI
          <Sparkles size={14} />
        </button>
      </div>
    </section>
  );
}