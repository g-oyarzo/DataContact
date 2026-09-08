import { Form, Head, Link, router } from '@inertiajs/react';
import { StickyNote, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { BreadcrumbItem } from '@/types';

interface ContactRef {
    id: number;
    first_name: string;
    last_name: string;
}

interface Note {
    id: number;
    content: string;
    created_at: string;
    contact: ContactRef;
}

interface PaginatedNotes {
    data: Note[];
    links: { url: string | null; label: string; active: boolean }[];
    last_page: number;
}

interface Props {
    notes: PaginatedNotes;
    contacts: ContactRef[];
    filteredContact: ContactRef | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notes', href: '/notes' },
];

function NotesIndex({ notes, contacts, filteredContact }: Props) {
    const [selectedContactId, setSelectedContactId] = useState<string>('');

    function handleDelete(noteId: number) {
        if (confirm('Delete this note?')) {
            router.delete(`/notes/${noteId}`, { preserveScroll: true });
        }
    }

    return (
        <>
            <Head title="Notes" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Notes
                    </h1>
                    {filteredContact ? (
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                                Showing notes for{' '}
                                <span className="font-medium text-foreground">
                                    {filteredContact.first_name} {filteredContact.last_name}
                                </span>
                            </span>
                            <Link
                                href="/notes"
                                className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs hover:bg-accent"
                            >
                                <X className="size-3" />
                                Clear filter
                            </Link>
                        </div>
                    ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                            All notes across your contacts
                        </p>
                    )}
                </div>

                {/* New note form */}
                <div className="rounded-lg border border-border bg-card p-4">
                    <Form
                        action={
                            selectedContactId
                                ? `/contacts/${selectedContactId}/notes`
                                : undefined
                        }
                        method="post"
                        resetOnSuccess={['content']}
                        className="flex flex-col gap-3"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2 sm:max-w-xs">
                                    <Select
                                        value={selectedContactId}
                                        onValueChange={setSelectedContactId}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a contact..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {contacts.map((c) => (
                                                <SelectItem key={c.id} value={String(c.id)}>
                                                    {c.first_name} {c.last_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Textarea
                                    name="content"
                                    placeholder="Write a note..."
                                    rows={3}
                                    disabled={!selectedContactId}
                                />
                                {errors.content && (
                                    <p className="text-sm text-destructive">{errors.content}</p>
                                )}

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        size="sm"
                                        disabled={processing || !selectedContactId}
                                    >
                                        {processing && <Spinner />}
                                        Add note
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                {/* Notes list */}
                {notes.data.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
                        <StickyNote className="size-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            No notes yet. Pick a contact above to add one.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {notes.data.map((note) => (
                            <div
                                key={note.id}
                                className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4"
                            >
                                <div>
                                    <Link
                                        href={`/contacts/${note.contact.id}`}
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        {note.contact.first_name} {note.contact.last_name}
                                    </Link>
                                    <p className="mt-1 text-sm text-foreground">{note.content}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {new Date(note.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7 shrink-0 opacity-0 transition group-hover:opacity-100"
                                    onClick={() => handleDelete(note.id)}
                                >
                                    <Trash2 className="size-3.5 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

NotesIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default NotesIndex;