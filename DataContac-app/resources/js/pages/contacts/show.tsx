import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    Mail,
    MapPin,
    Pencil,
    Phone,
    Trash2,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

interface Tag {
    id: number;
    name: string;
    color: string | null;
}

interface Company {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    country: string | null;
    company: Company | null;
    tags: Tag[];
}

interface Props {
    contact: Contact;
}

function ShowContact({ contact }: Props) {
    const fullName = `${contact.first_name} ${contact.last_name}`;
    const initials = `${contact.first_name[0] ?? ''}${contact.last_name[0] ?? ''}`.toUpperCase();

    const location = [contact.city, contact.state, contact.country]
        .filter(Boolean)
        .join(', ');

    function handleDelete() {
        if (confirm(`Delete ${fullName}? This action cannot be undone.`)) {
            router.delete(`/contacts/${contact.id}`);
        }
    }

    return (
        <>
            <Head title={fullName} />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Back link */}
                <div>
                    <Button variant="ghost" size="sm" asChild className="-ml-2">
                        <Link href="/contacts">
                            <ArrowLeft className="size-4" />
                            Back to contacts
                        </Link>
                    </Button>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-primary">
                            {initials || '—'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                                {fullName}
                            </h1>
                            {contact.company && (
                                <p className="text-sm text-muted-foreground">
                                    {contact.company.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/contacts/${contact.id}/edit`}>
                                <Pencil className="size-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="size-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Tags */}
                {contact.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {contact.tags.map((tag) => (
                            <Badge key={tag.id} variant="secondary">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Info card */}
                <div className="max-w-3xl rounded-lg border border-border bg-card p-6">
                    <h2 className="mb-4 text-sm font-semibold text-foreground">
                        Contact information
                    </h2>

                    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {contact.company && (
                            <div className="flex items-start gap-3">
                                <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <dt className="text-xs text-muted-foreground">Company</dt>
                                    <dd className="text-sm font-medium text-foreground">
                                        {contact.company.name}
                                    </dd>
                                </div>
                            </div>
                        )}

                        {contact.email && (
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <dt className="text-xs text-muted-foreground">Email</dt>
                                    <dd className="text-sm font-medium text-foreground">
                                        {contact.email}
                                    </dd>
                                </div>
                            </div>
                        )}

                        {contact.phone && (
                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <dt className="text-xs text-muted-foreground">Phone</dt>
                                    <dd className="text-sm font-medium text-foreground">
                                        {contact.phone}
                                    </dd>
                                </div>
                            </div>
                        )}

                        {(contact.address || location) && (
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <div>
                                    <dt className="text-xs text-muted-foreground">Address</dt>
                                    <dd className="text-sm font-medium text-foreground">
                                        {contact.address}
                                        {contact.address && location && <br />}
                                        {location}
                                        {contact.zip_code && ` ${contact.zip_code}`}
                                    </dd>
                                </div>
                            </div>
                        )}
                    </dl>

                    {!contact.company &&
                        !contact.email &&
                        !contact.phone &&
                        !contact.address &&
                        !location && (
                            <p className="text-sm text-muted-foreground">
                                No additional details yet.
                            </p>
                        )}
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Contacts', href: '/contacts' },
    { title: 'Contact details', href: '#' },
];

ShowContact.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default ShowContact;