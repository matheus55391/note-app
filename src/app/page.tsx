"use client";
import NoteCard from "@/components/NoteCard";
import React, { useState } from "react";
import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";

interface Note {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

const notesData: Note[] = [
  {
    id: 1,
    createdAt: new Date("2024-07-24"),
    updatedAt: new Date("2024-07-26"),
    content: "Note 1",
  },
  {
    id: 2,
    createdAt: new Date("2024-07-24"),
    updatedAt: new Date("2024-07-26"),
    content: "Note 2",
  },
  {
    id: 3,
    createdAt: new Date("2024-07-23"),
    updatedAt: new Date("2024-07-25"),
    content: "Note 3",
  },
  {
    id: 4,
    createdAt: new Date("2024-07-22"),
    updatedAt: new Date("2024-07-24"),
    content: "Note 4",
  },
];

const Home: React.FC = () => {
  const [notes, setNotes] = useState(notesData);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Largura inicial da barra lateral
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth < 200) return;
      if (newWidth > 500) return;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const groupNotesByDate = (notes: Note[]) => {
    const groupedNotes: { [key: string]: Note[] } = {};

    notes.forEach((note) => {
      const date = note.updatedAt.toISOString().split("T")[0]; // Formato yyyy-mm-dd
      if (!groupedNotes[date]) {
        groupedNotes[date] = [];
      }
      groupedNotes[date].push(note);
    });

    return groupedNotes;
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: notes.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: "New Note",
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      setNotes(notes.filter((note) => note.id !== selectedNote.id));
      setSelectedNote(null);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const groupedNotes = groupNotesByDate(filteredNotes);

  const onSelectNote = (id: string) => {
    throw new Error("Not implemented");
  };
  
  return (
    <main className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Left Sidebar */}
      <aside className="bg-gray-800 p-4" style={{ width: `${sidebarWidth}px` }}>
        <div className="space-y-4">
          <h2 className="mb-2 font-semibold text-lg">Notes Web</h2>
          {Object.keys(groupedNotes).map((date) => (
            <div key={date}>
              <h3 className="mb-2 font-semibold text-md">
                {new Date(date).toLocaleDateString()}
              </h3>
              <div className="space-y-2">
                {groupedNotes[date].map((note) => {
                  return (
                    <NoteCard
                      key={note.id}
                      time="00:00"
                      title={note.content}
                      isSelected={note.id === selectedNote?.id}
                      id={note.id.toString()}
                      onSelect={onSelectNote}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Resizer */}
      <div
        onMouseDown={handleMouseDown}
        className="w-2 cursor-ew-resize bg-gray-800"
      />

      {/* Right Content */}
      <section className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={handleCreateNote}
              className="p-2 bg-blue-600 text-white rounded flex items-center mr-2"
            >
              <FaPlus className="mr-1" /> New Note
            </button>
            <button
              onClick={handleDeleteNote}
              className="p-2 bg-red-600 text-white rounded flex items-center"
              disabled={!selectedNote}
            >
              <FaTrash className="mr-1" /> Delete Note
            </button>
          </div>
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="p-2 pl-10 bg-gray-900 text-gray-100 border border-gray-700 rounded"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 p-4">
          <textarea
            className="w-full h-full p-4 bg-gray-900 text-gray-100 border border-gray-700 rounded resize-none"
            placeholder="Start typing..."
            value={selectedNote ? selectedNote.content : ""}
            onChange={(e) => {
              if (selectedNote) {
                const updatedNote = {
                  ...selectedNote,
                  content: e.target.value,
                  updatedAt: new Date(),
                };
                setNotes(
                  notes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                  )
                );
                setSelectedNote(updatedNote);
              }
            }}
            disabled={!selectedNote}
          ></textarea>
        </div>
      </section>
    </main>
  );
};

export default Home;
