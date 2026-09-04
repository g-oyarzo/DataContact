import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { store } from '@/routes/contacts';
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

interface Props {
    companies: Company[];
    tags: Tag[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Contacts', href: '/contacts' },
    { title: 'New contact', href: '/contacts/create' },
];

function CreateContact({ companies, tags }: Props) {
    return (
        <>
            <Head title="New contact" />

            <div className="mx-auto flex max-w-2xl flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/contacts">
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        New contact
                    </h1>
                </div>

                <Form {...store.form()} className="flex flex-col gap-6">
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
                                        placeholder="Jane"
                                    />
                                    <InputError message={errors.first_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="last_name">Last name</Label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        required
                                        placeholder="Doe"
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
                                        placeholder="jane@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="+1 555 123 4567"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="company_id">Company</Label>
                                <Select name="company_id">
                                    <SelectTrigger id="company_id" className="w-full">
                                        <SelectValue placeholder="No company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((company) => (
                                            <SelectItem
                                                key={company.id}
                                                value={String(company.id)}
                                            >
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.company_id} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" name="state" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="zip_code">ZIP code</Label>
                                    <Input id="zip_code" name="zip_code" />
                                </div>
                                <div className="grid gap-2 sm:col-span-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" />
                                </div>
                            </div>

                            {tags.length > 0 && (
                                <div className="grid gap-2">
                                    <Label>Tags</Label>
                                    <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-card p-4">
                                        {tags.map((tag) => (
                                            <label
                                                key={tag.id}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <Checkbox
                                                    name="tags[]"
                                                    value={String(tag.id)}
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
                                    <Link href="/contacts">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && <Spinner />}
                                    Create contact
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

CreateContact.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default CreateContact;