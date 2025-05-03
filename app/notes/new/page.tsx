'use client';

import NoteForm from '../../components/NoteForm';

export default function NewNotePage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 px-4">New Note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
