import Link from "next/link";

export default function Header() {
  return (
    <header className="nav-backdrop fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-textmain">
            NOMAD AI
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#statement" className="text-textmuted hover:text-accent transition-colors font-medium">
              The Transition
            </Link>
            <Link href="/#obsessions" className="text-textmuted hover:text-accent transition-colors font-medium">
              Current Focus
            </Link>
            <Link href="/blog" className="text-textmuted hover:text-accent transition-colors font-medium">
              Field Notes
            </Link>
            <Link href="/#contact" className="text-textmuted hover:text-accent transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
