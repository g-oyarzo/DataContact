import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, StickyNote } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { BreadcrumbItem } from '@/types';

interface Company {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
    color: string | null;
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
    company_id: number | null;
    tags: { id: number; name: string }[];
}

interface Props {
    contact: Contact;
    companies: Company[];
    tags: Tag[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Contacts', href: '/contacts' },
    { title: 'Edit contact', href: '#' },
];

function EditContact({ contact, companies, tags }: Props) {
    const contactTagIds = contact.tags.map((t) => t.id);
    const initials = `${contact.first_name[0] ?? ''}${contact.last_name[0] ?? ''}`.toUpperCase();
    const company = companies.find((c) => c.id === contact.company_id);

    return (
        <>
            <Head title={`Edit ${contact.first_name} ${contact.last_name}`} />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/contacts/${contact.id}`}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Edit contact
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {contact.first_name} {contact.last_name}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
                    {/* Left column: summary card */}
                    <div className="flex flex-col gap-4">
                        <div className="rounded-lg border border-border bg-card p-5 text-center">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-lg font-semibold text-primary">
                                {initials || '—'}
                            </div>
                            <p className="mt-3 font-semibold text-foreground">
                                {contact.first_name} {contact.last_name}
                            </p>
                            {company && (
                                <p className="text-sm text-muted-foreground">{company.name}</p>
                            )}
                        </div>

                        {contact.tags.length > 0 && (
                            <div className="rounded-lg border border-border bg-card p-5">
                                <p className="mb-2 text-xs font-medium text-muted-foreground">
                                    Tags
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {contact.tags.map((tag) => (
                                        <Badge key={tag.id} variant="secondary">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button variant="outline" asChild>
                            <Link href={`/notes?contact_id=${contact.id}`}>
                                <StickyNote className="size-4" />
                                View notes
                            </Link>
                        </Button>
                    </div>

                    {/* Right column: form */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <Form
                            action={`/contacts/${contact.id}`}
                            method="put"
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first_name">First name</Label>
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                required
                                                autoFocus
                                                defaultValue={contact.first_name}
                                            />
                                            <InputError message={errors.first_name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="last_name">Last name</Label>
                                            <Input
                                                id="last_name"
                                                name="last_name"
                                                required
                                                defaultValue={contact.last_name}
                                            />
                                            <InputError message={errors.last_name} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={contact.email ?? ''}
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                defaultValue={contact.phone ?? ''}
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="company_id">Company</Label>
                                        <Select
                                            name="company_id"
                                            defaultValue={
                                                contact.company_id
                                                    ? String(contact.company_id)
                                                    : undefined
                                            }
                                        >
                                            <SelectTrigger id="company_id" className="w-full">
                                                <SelectValue placeholder="No company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {companies.map((c) => (
                                                    <SelectItem key={c.id} value={String(c.id)}>
                                                        {c.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.company_id} />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                defaultValue={contact.address ?? ''}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                defaultValue={contact.city ?? ''}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input
                                                id="state"
                                                name="state"
                                                defaultValue={contact.state ?? ''}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="zip_code">ZIP code</Label>
                                            <Input
                                                id="zip_code"
                                                name="zip_code"
                                                defaultValue={contact.zip_code ?? ''}
                                            />
                                        </div>
                                        <div className="grid gap-2 sm:col-span-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Input
                                                id="country"
                                                name="country"
                                                defaultValue={contact.country ?? ''}
                                            />
                                        </div>
                                    </div>

                                    {tags.length > 0 && (
                                        <div className="grid gap-2">
                                            <Label>Tags</Label>
                                            <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-background p-4">
                                                {tags.map((tag) => (
                                                    <label
                                                        key={tag.id}
                                                        className="flex items-center gap-2 text-sm"
                                                    >
                                                        <Checkbox
                                                            name="tags[]"
                                                            value={String(tag.id)}
                                                            defaultChecked={contactTagIds.includes(
                                                                tag.id
                                                            )}
                                                        />
                                                        {tag.name}
                                                    </label>
                                                ))}
                                            </div>
                                            <InputError message={errors.tags} />
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-3">
                                        <Button variant="outline" asChild>
                                            <Link href={`/contacts/${contact.id}`}>Cancel</Link>
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            {processing && <Spinner />}
                                            Save changes
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

EditContact.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default EditContact;