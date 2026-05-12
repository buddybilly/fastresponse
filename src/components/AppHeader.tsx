import { Link, useRouterState } from "@tanstack/react-router";
import { Phone, Stethoscope, BookOpen, Syringe } from "lucide-react";

export function AppHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navItems = [
    { to: "/", label: "Protocolos", icon: BookOpen },
    { to: "/acessos", label: "Acessos & Medicação", icon: Syringe },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground shrink-0"
            style={{ background: "var(--gradient-calm)" }}
          >
            <Stethoscope className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <h1 className="font-semibold text-sm md:text-base">FAST-RESPONSE</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
              Odontologia Santa Bárbara
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 p-1 bg-secondary rounded-xl">
          {navItems.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href="tel:192"
          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-destructive-foreground font-semibold text-sm hover:scale-[1.02] transition-transform"
          style={{ background: "var(--gradient-emergency)", boxShadow: "var(--shadow-emergency)" }}
        >
          <Phone className="w-4 h-4" />
          SAMU 192
        </a>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center gap-1 px-5 pb-3">
        {navItems.map((item) => {
          const active = path === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                active ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
