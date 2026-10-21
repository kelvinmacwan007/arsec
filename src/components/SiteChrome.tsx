"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/content/pages";
export function Brand() {
  return (
    <Link href="/" className="logo" aria-label="Arsec home">
      <img
        className="full-brand-logo"
        src="/brand/arsec-logo.svg"
        alt="Arsec"
        width="130"
        height="30"
      />
    </Link>
  );
}
export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const path = usePathname();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        Technology with purpose. Progress that feels natural.{" "}
        <Link href="/resources/contact-us">Let’s talk ↗</Link>
      </div>
      <header>
        <nav
          className="wrap nav"
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(null);
              setMobile(false);
            }
          }}
        >
          <Brand />
          <button
            className="menu-button"
            aria-label="Toggle navigation"
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? "✕" : "☰"}
          </button>
          <div className={`nav-links ${mobile ? "open" : ""}`}>
            {navigation.map((n) => (
              <div className="nav-group" key={n.href}>
                <div className="nav-parent">
                  <Link
                    aria-current={path === n.href ? "page" : undefined}
                    href={n.href}
                    onClick={() => {
                      setOpen(null);
                      setMobile(false);
                    }}
                  >
                    {n.title}
                  </Link>
                  <button
                    aria-label={`Show ${n.title} pages`}
                    aria-expanded={open === n.title}
                    onClick={() => setOpen(open === n.title ? null : n.title)}
                  >
                    ⌄
                  </button>
                </div>
                {open === n.title && (
                  <div className="mega-menu">
                    <div className="mega-intro">
                      <span className="section-label">Explore Arsec</span>
                      <h3>{n.title}</h3>
                      <Link
                        href={n.href}
                        onClick={() => {
                          setOpen(null);
                          setMobile(false);
                        }}
                      >
                        View overview ↗
                      </Link>
                    </div>
                    <div className="mega-links">
                      {n.pages.map((p) => (
                        <Link
                          key={p.path}
                          href={p.path}
                          aria-current={path === p.path ? "page" : undefined}
                          onClick={() => {
                            setOpen(null);
                            setMobile(false);
                          }}
                        >
                          {p.title}
                          <span>↗</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link className="button nav-cta" href="/resources/contact-us">
            Let’s talk <span>↗</span>
          </Link>
        </nav>
      </header>
      {open && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={() => setOpen(null)}
        />
      )}
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="wrap arsec-footer">
      <div className="footer-brand">
        <Brand />
        <p>
          Thoughtful software.
          <br />
          Connected technology. Room to grow.
        </p>
        <Link href="/resources/contact-us" className="text-link">
          Start a conversation ↗
        </Link>
      </div>
      <div className="footer-columns">
        {navigation.map((n) => (
          <div key={n.href}>
            <h4>
              <Link href={n.href}>{n.title}</Link>
            </h4>
            {n.pages.map((p) => (
              <Link key={p.path} href={p.path}>
                {p.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arsec. All rights reserved.</span>
        <span>AI, software & enterprise technology.</span>
        <Link href="/resources/contact-us">Connect with us ↗</Link>
      </div>
    </footer>
  );
}
export function ContactForm({ career = false }: { career?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="inquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const content = Array.from(data.entries())
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n\n");
        const blob = new Blob(
          [
            `${career ? "Career interest" : "Arsec project enquiry"}\n\n${content}`,
          ],
          { type: "text/plain" },
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = career
          ? "arsec-career-interest.txt"
          : "arsec-project-enquiry.txt";
        a.click();
        URL.revokeObjectURL(url);
        setSaved(true);
      }}
    >
      <h3>
        {career ? "Prepare your introduction" : "Tell us about your project"}
      </h3>
      <div className="form-row">
        <label>
          Your name
          <input
            name="Name"
            autoComplete="name"
            required
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Work email
          <input
            name="Email"
            type="email"
            autoComplete="email"
            required
            placeholder="alex@company.com"
          />
        </label>
      </div>
      <label>
        {career ? "Area of interest" : "Company"}
        <input
          name={career ? "Area of interest" : "Company"}
          autoComplete={career ? "off" : "organization"}
          required
          placeholder={
            career ? "Engineering, design, or operations" : "Your organisation"
          }
        />
      </label>
      <label>
        {career ? "Your introduction" : "How can we help?"}
        <textarea
          name="Message"
          required
          rows={5}
          placeholder={
            career
              ? "Tell us about your experience and the work you enjoy."
              : "Tell us about your goals, timeline, and current challenges."
          }
        />
      </label>
      <p className="form-note">
        This form prepares a downloadable enquiry. Online delivery will be
        enabled when Arsec’s contact destination is provided.
      </p>
      <button className="button" type="submit">
        Download {career ? "introduction" : "enquiry"} <span>↓</span>
      </button>
      {saved && (
        <p role="status" className="form-success">
          Your document is ready. Nothing has been sent or stored on this
          website.
        </p>
      )}
    </form>
  );
}
export function KnowledgeBase() {
  const [query, setQuery] = useState("");
  const items = [
    [
      "Where should I start with a product enquiry?",
      "Tell us which product interests you, who will use it, and the workflows you need to support. We can then discuss requirements and a suitable walkthrough.",
    ],
    [
      "How do I plan an application modernisation project?",
      "Start with an inventory of applications, dependencies, and user needs. Prioritise business value and operational risk before choosing a migration or rebuild approach.",
    ],
    [
      "What information helps with cloud discovery?",
      "Prepare a list of workloads, environments, dependencies, security requirements, and current operating costs. Avoid sharing passwords or access keys in an initial enquiry.",
    ],
    [
      "How should we prepare for an AI initiative?",
      "Define a specific task, the information it needs, and the way you will evaluate results. Consider privacy, access, and human review early.",
    ],
    [
      "Can you help us choose an enterprise platform?",
      "Begin by mapping processes, data, integrations, and reporting needs. A platform assessment should consider the people who will operate and maintain it.",
    ],
    [
      "How do I contact Arsec?",
      "Use the Contact Us page to prepare your project enquiry. Direct contact details will be added when confirmed.",
    ],
  ];
  const matches = items.filter((a) =>
    a.join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="knowledge">
      <label className="search-label">
        Search the knowledge base
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Try cloud, products, or AI…"
        />
      </label>
      <p className="search-count" aria-live="polite">
        {matches.length} answers
      </p>
      {matches.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span>+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
      {!matches.length && (
        <p>No matching answers. Try another search or visit Contact Us.</p>
      )}
    </div>
  );
}
