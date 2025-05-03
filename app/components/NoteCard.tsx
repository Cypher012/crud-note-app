'use client';

import { Note } from '@prisma/client';
import Link from 'next/link';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const contentPreview = note.content ? note.content.slice(0, 100) + '...' : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
          <p className="text-gray-600 text-sm">{contentPreview}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/notes/edit/${note.id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(note.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
