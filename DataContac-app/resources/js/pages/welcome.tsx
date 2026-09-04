import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Users, ClipboardList, Building2 } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="DataContact" />

            <div className="min-h-screen bg-background text-foreground transition-colors duration-200">

                {/* NAVBAR */}
                <header className="border-b border-border">
                    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

                        {/* Logo */}
                                <Link href="/" className="flex items-center gap-2">
                    <AppLogoIcon className="h-8 w-8 text-primary" />
                    <span className="text-lg font-bold tracking-tight">
                        <span className="text-primary">Data</span>
                        <span className="text-foreground">Contact</span>
                    </span>
                </Link>

                        {/* Navigation */}
                        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                            <a
                                href="#about"
                                className="transition hover:text-primary"
                            >
                                About
                            </a>
                            
                            <a
                                href="#features"
                                className="transition hover:text-primary"
                            >
                                Features
                            </a>
                        </div>

                        {/* Auth */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* HERO */}
                <main>
                    <section
                        id="about"
                        className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20"
                    >
                        <div className="grid items-center gap-12 lg:grid-cols-2">

                            {/* Hero text */}
                            <div>
                                <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground lg:text-6xl">
                                    Manage your
                                    <br />
                                    relationships with
                                    <br />
                                    <span className="text-primary">
                                        intelligence.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
                                    DataContact is a modern contact manager designed to give you a holistic view and complete control over every relationship. 
                                    Organize your network efficiently with dynamic tags, record detailed notes of every interaction, and keep all your key 
                                    connections always within reach.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                                    >
                                        Get Started
                                    </Link>

                                    <Link
                                        href={login()}
                                        className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>

                            {/* Hero image */}
                            <div className="relative">
                                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                                    <img
                                        src="/images/crm-dashboard.jpg"
                                        alt="DataContact CRM"
                                        className="h-[400px] w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FEATURES */}
                    <section
                        id="features"
                        className="border-t border-border bg-muted/50"
                    >
                        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                                    The control of your professional relationships simplified
                                </h2>
                            </div>

                            <div className="mt-12 grid gap-5 md:grid-cols-3">
                                <FeatureCard
                                    icon={<Users className="h-6 w-6" />}
                                    title="Intelligent Contacts"
                                    description="Manage individuals with precision. Use dynamic tags, custom fields, to keep your contact data accurate and actionable."
                                    items={['Smart Tagging System']}
                                />

                                <FeatureCard
                                    icon={<ClipboardList className="h-6 w-6" />}
                                    title="Contextual Notes"
                                    description="Keep track of every interaction with notes and reminders specific to each contact, organized in perfect chronological order so you never lose context before your next meeting."
                                    items={['Timeline View']}
                                    highlighted={true}
                                />

                                <FeatureCard
                                    icon={<Building2 className="h-6 w-6" />}
                                    title="Holistic Companies"
                                    description="Group contacts logically under their respective organizations."
                                    items={['Organizational Mapping']}
                                />
                            </div>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="border-t border-border bg-background">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-muted-foreground lg:px-8">
                        <span>
                            © {new Date().getFullYear()} DataContact
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    items,
    highlighted = true,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    items: string[];
    highlighted?: boolean;
}) {
    return (
        <div
            className={`rounded-xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md bg-card text-card-foreground ${
                highlighted
                    ? 'border-primary/50 shadow-primary/10'
                    : 'border-border'
            }`}
        >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                {icon}
            </div>

            <h3 className="text-base font-semibold text-foreground">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <ul className="mt-5 space-y-2">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}