<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Note;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NoteController extends Controller
{
    public function index(Request $request): Response
    {
        $notes = Note::whereHas('contact', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->with('contact:id,first_name,last_name')
            ->when($request->filled('contact_id'), function ($query) use ($request) {
                $query->where('contact_id', $request->integer('contact_id'));
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        // Si venimos filtrados por un contacto puntual, mandamos su nombre
        // para mostrarlo en la UI (ej: "Notes for Jane Doe")
        $filteredContact = null;
        if ($request->filled('contact_id')) {
            $filteredContact = Contact::where('user_id', $request->user()->id)
                ->find($request->integer('contact_id'), ['id', 'first_name', 'last_name']);
        }

        return Inertia::render('notes/index', [
            'notes' => $notes,
            'contacts' => Contact::where('user_id', $request->user()->id)
                ->orderBy('first_name')
                ->get(['id', 'first_name', 'last_name']),
            'filteredContact' => $filteredContact,
        ]);
    }

    public function store(Request $request, Contact $contact): RedirectResponse
    {
        $this->authorize('update', $contact);

        $validated = $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $contact->notes()->create($validated);

        return back()->with('success', 'Note added.');
    }

    public function destroy(Note $note): RedirectResponse
    {
        $this->authorize('update', $note->contact);

        $note->delete();

        return back()->with('success', 'Note deleted.');
    }
}