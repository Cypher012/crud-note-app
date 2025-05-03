'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NoteForm from '../../../components/NoteForm';
import { Note } from '@prisma/client';

export default function EditNotePage() {
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch note');
        }
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <p>Note not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 px-4">
          Edit Note
        </h1>
        <NoteForm note={note} />
      </div>
    </main>
  );
}
