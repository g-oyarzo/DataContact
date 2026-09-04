import { Head, Link, router } from '@inertiajs/react';
import { HelpCircle, Plus, Search, UploadCloud, UserPlus } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    company: Company | null;
    tags: Tag[];
}

interface PaginatedContacts {
    data: Contact[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    contacts: PaginatedContacts;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Contactos', href: '/contacts' },
];

export default function ContactsIndex({ contacts }: Props) {
    const [search, setSearch] = useState('');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get('/contacts', { search }, { preserveState: true, replace: true });
    }

    return (
        <>
            <Head title="Contactos" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Barra de búsqueda superior */}
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar contactos por nombre, email o etiqueta..."
                            className="h-12 rounded-lg border-border bg-card pl-11 pr-16 text-sm"
                        />
                        <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                            ⌘K
                        </kbd>
                    </div>
                </form>

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Todos los contactos
                        </h1>
                        <Badge variant="secondary" className="rounded-full">
                            {contacts.total} {contacts.total === 1 ? 'contacto' : 'contactos'}
                        </Badge>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" disabled>
                            <UploadCloud className="size-4" />
                            Importar
                        </Button>
                        <Button asChild>
                            <Link href="/contacts/create">
                                <Plus className="size-4" />
                                Nuevo contacto
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Tabla / empty state */}
                {contacts.data.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="overflow-hidden rounded-lg border border-border bg-card">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-border bg-muted/40 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Nombre</th>
                                    <th className="px-4 py-3 font-medium">Empresa</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium">Etiquetas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {contacts.data.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="cursor-pointer transition hover:bg-muted/40"
                                        onClick={() => router.visit(`/contacts/${contact.id}`)}
                                    >
                                        <td className="px-4 py-3 font-medium text-foreground">
                                            {contact.first_name} {contact.last_name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {contact.company?.name ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {contact.email ?? '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-1">
                                                {contact.tags.map((tag) => (
                                                    <Badge key={tag.id} variant="secondary">
                                                        {tag.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Paginación */}
                {contacts.last_page > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-1">
                        {contacts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                preserveState
                                className={`rounded-md px-3 py-1.5 text-sm transition ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted'
                                } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    ); 
}

function EmptyState() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-6 rounded-lg border border-border bg-card px-6 py-16 text-center">
                {/* Icono */}
                <div className="relative flex size-20 items-center justify-center rounded-full bg-accent">
                    <UserPlus className="size-9 text-primary" />
                    <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Plus className="size-4" />
                    </span>
                </div>

                {/* Texto */}
                <div className="max-w-sm">
                    <h2 className="text-xl font-semibold text-foreground">
                        No tenés ningún contacto agendado
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Tu lista de contactos está vacía. Empezá a conectar
                        agregando colegas, amigos o clientes para gestionar tu
                        agenda de forma centralizada.
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button asChild>
                        <Link href="/contacts/create">
                            <UserPlus className="size-4" />
                            Crear contacto
                        </Link>
                    </Button>
                    <Button variant="secondary" disabled>
                        <UploadCloud className="size-4" />
                        Importar contactos
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Próximamente: compatibilidad con archivos .csv y .vcf
                </p>
            </div>

            {/* Sección de ayuda */}
            <div>
                <div className="flex items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground">
                    <span>COMENZAR CON DATACONTAC</span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                            <HelpCircle className="size-4" />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                ¿Necesitás ayuda para empezar?
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Mirá cómo cargar tu primer contacto en menos de un minuto.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                        Ver guía
                    </Button>
                </div>
            </div>
        </div>
    );
}


ContactsIndex.layout = {
    breadcrumbs: breadcrumbs,
};