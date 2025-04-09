export default function NoteList({ notes, onUpdate, onDelete }) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 bg-white dark:bg-gray-700 border rounded-md shadow"
        >
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {note.title}
          </h2>
          <p className="text-black dark:text-gray-100 mt-1 whitespace-pre-line">
            {note.content}
          </p>

          <div className="text-sm text-gray-500 dark:text-gray-300 mt-2">
            Created: {new Date(note.createdAt).toLocaleString()}
            {note.updatedAt && (
              <div>Updated: {new Date(note.updatedAt).toLocaleString()}</div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                const newTitle = prompt("New title", note.title);
                const newContent = prompt("New content", note.content);
                if (newTitle && newContent) {
                  onUpdate({ ...note, title: newTitle, content: newContent });
                }
              }}
              className="bg-yellow-400 px-4 py-1 rounded text-white hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
