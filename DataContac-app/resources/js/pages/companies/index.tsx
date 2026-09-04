import { Head, Link, router } from '@inertiajs/react';
import { Building2, HelpCircle, Plus, Search, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BreadcrumbItem } from '@/types';

interface Company {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    contacts_count?: number;
}

interface PaginatedCompanies {
    data: Company[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    companies: PaginatedCompanies;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Empresas', href: '/companies' },
];

export default function CompaniesIndex({ companies }: Props) {
    const [search, setSearch] = useState('');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get('/companies', { search }, { preserveState: true, replace: true });
    }

    return (
        <>
            <Head title="Empresas" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Barra de búsqueda superior */}
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar empresas por nombre, email o teléfono..."
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
                            Todas las empresas
                        </h1>
                        <Badge variant="secondary" className="rounded-full">
                            {companies.total} {companies.total === 1 ? 'empresa' : 'empresas'}
                        </Badge>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" disabled>
                            <UploadCloud className="size-4" />
                            Importar
                        </Button>
                        <Button asChild>
                            <Link href="/companies/create">
                                <Plus className="size-4" />
                                Nueva empresa
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Tabla / empty state */}
                {companies.data.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="overflow-hidden rounded-lg border border-border bg-card">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-border bg-muted/40 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Nombre</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium">Teléfono</th>
                                    <th className="px-4 py-3 font-medium">Contactos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {companies.data.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="cursor-pointer transition hover:bg-muted/40"
                                        onClick={() => router.visit(`/companies/${company.id}`)}
                                    >
                                        <td className="px-4 py-3 font-medium text-foreground">
                                            {company.name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {company.email ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {company.phone ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {company.contacts_count ?? 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Paginación */}
                {companies.last_page > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-1">
                        {companies.links.map((link, i) => (
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
                    <Building2 className="size-9 text-primary" />
                    <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Plus className="size-4" />
                    </span>
                </div>

                {/* Texto */}
                <div className="max-w-sm">
                    <h2 className="text-xl font-semibold text-foreground">
                        No tenés ninguna empresa registrada
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Tu lista de empresas está vacía. Empezá a agregar organizaciones o clientes corporativos para gestionar tu CRM de forma centralizada.
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button asChild>
                        <Link href="/companies/create">
                            <Building2 className="size-4" />
                            Crear empresa
                        </Link>
                    </Button>
                    <Button variant="secondary" disabled>
                        <UploadCloud className="size-4" />
                        Importar empresas
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Próximamente: compatibilidad con archivos .csv
                </p>
            </div>

            {/* Sección de ayuda */}
            <div>
                <div className="flex items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground">
                    <span>GESTIÓN DE EMPRESAS</span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                            <HelpCircle className="size-4" />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                ¿Cómo relacionar contactos con empresas?
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Aprendé a vincular tus contactos corporativos a sus respectivas organizaciones.
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

CompaniesIndex.layout = {
    breadcrumbs: breadcrumbs,
};