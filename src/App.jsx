import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const NOTES_KEY = "notevault.notes";

function App() {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: note.title,
      content: note.content,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, newNote]);
    toast.success("Note added");
  };

  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
    toast.success("Note updated");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast("Note deleted", { icon: "🗑️" });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-slate-100 text-black">
      <Toaster position="top-right" />
      <div className="w-full h-full bg-white p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 NoteVault</h1>

        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md text-black"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(notes, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "notes.json";
              a.click();
              URL.revokeObjectURL(url);
              toast.success("Exported as JSON");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export as JSON
          </button>

          <button
            onClick={() => {
              const content = notes
                .map((n) => `Title: ${n.title}\nContent: ${n.content}\n---`)
                .join("\n\n");
              const blob = new Blob([content], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "notes.txt";
              a.click();
              URL.revokeObjectURL(url);
              toast.success("Exported as TXT");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export as TXT
          </button>
        </div>

        <NoteForm onSubmit={addNote} />
        <NoteList
          notes={filteredNotes}
          onUpdate={updateNote}
          onDelete={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
