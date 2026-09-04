<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Contact::class);

        $contacts = Contact::where('user_id', $request->user()->id)
            ->with(['company', 'tags'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorize('create', Contact::class);

        return Inertia::render('contacts/create', [
            'companies' => Company::where('user_id', $request->user()->id)->get(['id', 'name']),
            'tags' => Tag::where('user_id', $request->user()->id)->get(['id', 'name', 'color']),
        ]);
    }

    public function store(StoreContactRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $tagIds = $validated['tags'] ?? [];
        unset($validated['tags']);

        $validated['user_id'] = $request->user()->id;

        $contact = Contact::create($validated);

        if (! empty($tagIds)) {
            $contact->tags()->sync($tagIds);
        }

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact): Response
    {
        $this->authorize('view', $contact);

        $contact->load(['company', 'tags', 'notes' => fn ($q) => $q->latest()]);

        return Inertia::render('contacts/show', [
            'contact' => $contact,
        ]);
    }

    public function edit(Request $request, Contact $contact): Response
    {
        $this->authorize('update', $contact);

        $contact->load('tags:id');

        return Inertia::render('contacts/edit', [
            'contact' => $contact,
            'companies' => Company::where('user_id', $request->user()->id)->get(['id', 'name']),
            'tags' => Tag::where('user_id', $request->user()->id)->get(['id', 'name', 'color']),
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact): RedirectResponse
    {
        $this->authorize('update', $contact);

        $validated = $request->validated();
        $tagIds = $validated['tags'] ?? [];
        unset($validated['tags']);

        $contact->update($validated);
        $contact->tags()->sync($tagIds);

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $this->authorize('delete', $contact);

        $contact->delete();

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}