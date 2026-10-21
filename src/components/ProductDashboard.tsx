"use client";
import { useState, type KeyboardEvent } from "react";
export function handlePreviewTabKeys(event: KeyboardEvent<HTMLDivElement>) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const buttons = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]"),
  );
  const current = buttons.indexOf(event.target as HTMLButtonElement);
  if (current < 0) return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : (current + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) %
          buttons.length;
  buttons[next].focus();
  buttons[next].click();
}
import { ProductIcon } from "./ProductIcon";
import type { ProductDetail } from "@/content/products";
type Candidate = {
  name: string;
  role: string;
  stage: number;
  skills: string;
  date: string;
};
const initialCandidates: Candidate[] = [
  {
    name: "Aarav Sharma",
    role: "Product Designer",
    stage: 0,
    skills: "Figma · Design systems",
    date: "24 Oct · 10:30 AM",
  },
  {
    name: "Maya Patel",
    role: "Frontend Engineer",
    stage: 0,
    skills: "React · TypeScript",
    date: "24 Oct · 2:00 PM",
  },
  {
    name: "Sofia Chen",
    role: "Product Designer",
    stage: 1,
    skills: "Research · Prototyping",
    date: "25 Oct · 11:00 AM",
  },
  {
    name: "Noah Williams",
    role: "Frontend Engineer",
    stage: 1,
    skills: "Next.js · Accessibility",
    date: "25 Oct · 3:30 PM",
  },
  {
    name: "Isha Kapoor",
    role: "Product Designer",
    stage: 2,
    skills: "UI design · Strategy",
    date: "26 Oct · 10:00 AM",
  },
  {
    name: "Daniel Kim",
    role: "Frontend Engineer",
    stage: 3,
    skills: "React · Architecture",
    date: "26 Oct · 1:00 PM",
  },
];
const employees = [
  {
    name: "Aarav Sharma",
    role: "Product Designer",
    team: "Design",
    location: "Bengaluru",
    salary: 72000,
    deduction: 7200,
  },
  {
    name: "Maya Patel",
    role: "Frontend Engineer",
    team: "Engineering",
    location: "Remote",
    salary: 92000,
    deduction: 9200,
  },
  {
    name: "Sofia Chen",
    role: "Design Lead",
    team: "Design",
    location: "Remote",
    salary: 105000,
    deduction: 10500,
  },
  {
    name: "Noah Williams",
    role: "Product Manager",
    team: "Product",
    location: "Bengaluru",
    salary: 98000,
    deduction: 9800,
  },
  {
    name: "Isha Kapoor",
    role: "People Partner",
    team: "People",
    location: "Bengaluru",
    salary: 68000,
    deduction: 6800,
  },
  {
    name: "Daniel Kim",
    role: "Backend Engineer",
    team: "Engineering",
    location: "Remote",
    salary: 88000,
    deduction: 8800,
  },
];
const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
function Avatar({ name, index = 0 }: { name: string; index?: number }) {
  return (
    <span className={`app-avatar avatar-${index % 4}`} aria-hidden>
      {initials(name)}
    </span>
  );
}
function Stats({ items }: { items: [string, string, string][] }) {
  return (
    <div className="app-stats">
      {items.map(([label, value, note]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{note}</small>
        </div>
      ))}
    </div>
  );
}
function Search({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="app-search">
      <ProductIcon name="search" size={16} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </label>
  );
}
function RecruitView({
  tab,
  notify,
}: {
  tab: string;
  notify: (v: string) => void;
}) {
  const [people, setPeople] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All roles");
  const stages = ["Applied", "Screening", "Interview", "Offer"];
  const filtered = people.filter(
    (p) =>
      (role === "All roles" || p.role === role) &&
      `${p.name} ${p.skills}`.toLowerCase().includes(search.toLowerCase()),
  );
  const advance = (name: string) => {
    setPeople((a) =>
      a.map((p) =>
        p.name === name ? { ...p, stage: Math.min(p.stage + 1, 3) } : p,
      ),
    );
    notify(`${name} moved to the next hiring stage.`);
  };
  return (
    <>
      <Stats
        items={[
          ["Open roles", "2", "Design & Engineering"],
          ["Active candidates", String(people.length), "Across your pipeline"],
          [
            "At interview",
            String(people.filter((p) => p.stage === 2).length),
            "Conversations in progress",
          ],
          [
            "Offers",
            String(people.filter((p) => p.stage === 3).length),
            "Ready for the next step",
          ],
        ]}
      />
      <div className="app-toolbar">
        <div>
          <h4>
            {tab === "Interviews"
              ? "Upcoming interviews"
              : tab === "Candidates"
                ? "Candidate directory"
                : "Your hiring pipeline"}
          </h4>
          <p>
            {tab === "Pipeline"
              ? "Every candidate. One shared view."
              : "A little context for every conversation."}
          </p>
        </div>
        <div className="app-filters">
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Search candidates"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Filter by role"
          >
            <option>All roles</option>
            <option>Product Designer</option>
            <option>Frontend Engineer</option>
          </select>
        </div>
      </div>
      {!filtered.length ? (
        <div className="app-empty">No candidates match your search.</div>
      ) : tab === "Pipeline" ? (
        <div className="kanban-board">
          {stages.map((stage, i) => (
            <section key={stage} className={`kanban-column stage-${i}`}>
              <h5>
                <i />
                {stage}
                <span>{filtered.filter((p) => p.stage === i).length}</span>
              </h5>
              {filtered
                .filter((p) => p.stage === i)
                .map((p, j) => (
                  <article className="candidate-card" key={p.name}>
                    <div>
                      <Avatar name={p.name} index={j + i} />
                      <span className="candidate-dots">···</span>
                    </div>
                    <h6>{p.name}</h6>
                    <p>{p.role}</p>
                    <span className="candidate-skill">{p.skills}</span>
                    <div className="candidate-footer">
                      <span>
                        <ProductIcon name="file" size={12} /> Profile
                      </span>
                      {i < 3 ? (
                        <button
                          onClick={() => advance(p.name)}
                          aria-label={`Move ${p.name} to ${stages[i + 1]}`}
                        >
                          Move to {stages[i + 1]} →
                        </button>
                      ) : (
                        <span className="app-pill">Offer ready</span>
                      )}
                    </div>
                  </article>
                ))}
              {!filtered.some((p) => p.stage === i) && (
                <p className="column-empty">A little room for what’s next.</p>
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className="app-table-scroll">
          <table className="app-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>{tab === "Interviews" ? "Scheduled for" : "Skills"}</th>
                <th>Stage</th>
                <th>Next step</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.name}>
                  <td>
                    <div className="person-cell">
                      <Avatar name={p.name} index={i} />
                      <b>{p.name}</b>
                    </div>
                  </td>
                  <td>{p.role}</td>
                  <td>{tab === "Interviews" ? p.date : p.skills}</td>
                  <td>
                    <span className="app-pill">{stages[p.stage]}</span>
                  </td>
                  <td>
                    {p.stage < 3 ? (
                      <button
                        className="table-action"
                        onClick={() => advance(p.name)}
                      >
                        Move forward →
                      </button>
                    ) : (
                      <span>Offer ready ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
function PeopleView({
  tab,
  notify,
}: {
  tab: string;
  notify: (v: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("All departments");
  const [requests, setRequests] = useState([
    {
      name: "Maya Patel",
      type: "Annual leave",
      dates: "28–30 Oct",
      days: 3,
      status: "Pending",
    },
    {
      name: "Aarav Sharma",
      type: "Personal leave",
      dates: "25 Oct",
      days: 1,
      status: "Pending",
    },
    {
      name: "Isha Kapoor",
      type: "Annual leave",
      dates: "02–03 Nov",
      days: 2,
      status: "Pending",
    },
  ]);
  const decide = (name: string, status: string) => {
    setRequests((a) => a.map((p) => (p.name === name ? { ...p, status } : p)));
    notify(`${name}’s request ${status.toLowerCase()}.`);
  };
  const filtered = employees.filter(
    (p) =>
      (team === "All departments" || p.team === team) &&
      `${p.name} ${p.role}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <Stats
        items={[
          ["Team members", "6", "A connected team"],
          ["Working remotely", "3", "Across your workspace"],
          [
            "Pending requests",
            String(requests.filter((r) => r.status === "Pending").length),
            "Waiting for your review",
          ],
          ["Departments", "4", "Different skills. Shared goals."],
        ]}
      />
      {tab === "Employees" ? (
        <>
          <div className="app-toolbar">
            <div>
              <h4>Your people, in one place</h4>
              <p>A directory with a little more context.</p>
            </div>
            <div className="app-filters">
              <Search
                value={search}
                onChange={setSearch}
                placeholder="Search employees"
              />
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                aria-label="Filter department"
              >
                {[
                  "All departments",
                  "Design",
                  "Engineering",
                  "Product",
                  "People",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="employee-grid">
            {filtered.map((p, i) => (
              <article key={p.name}>
                <Avatar name={p.name} index={i} />
                <h5>{p.name}</h5>
                <p>{p.role}</p>
                <span className="app-pill">{p.team}</span>
                <small>{p.location} · Full time</small>
              </article>
            ))}
          </div>
          {!filtered.length && (
            <p className="app-empty">No team members match your search.</p>
          )}
        </>
      ) : (
        <div className={`people-panels ${tab === "Time off" ? "single" : ""}`}>
          <section className="app-panel">
            <div className="app-panel-heading">
              <h4>Time-off requests</h4>
              <span>
                {requests.filter((r) => r.status === "Pending").length} pending
              </span>
            </div>
            {requests.map((r, i) => (
              <div className="leave-row" key={r.name}>
                <Avatar name={r.name} index={i} />
                <div>
                  <b>{r.name}</b>
                  <span>
                    {r.type} · {r.dates} · {r.days}{" "}
                    {r.days === 1 ? "day" : "days"}
                  </span>
                </div>
                {r.status === "Pending" ? (
                  <div className="leave-actions">
                    <button
                      aria-label={`Approve ${r.name}'s leave`}
                      onClick={() => decide(r.name, "Approved")}
                    >
                      ✓
                    </button>
                    <button
                      aria-label={`Decline ${r.name}'s leave`}
                      onClick={() => decide(r.name, "Declined")}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span
                    className={`app-pill ${r.status === "Declined" ? "muted" : ""}`}
                  >
                    {r.status}
                  </span>
                )}
              </div>
            ))}
          </section>
          {tab === "Overview" && (
            <section className="app-panel">
              <div className="app-panel-heading">
                <h4>Team at a glance</h4>
                <span>This month</span>
              </div>
              <div className="team-chart">
                <div className="donut">
                  <span>
                    6<small>good people</small>
                  </span>
                </div>
                <div>
                  {[
                    ["Design", 2],
                    ["Engineering", 2],
                    ["Product", 1],
                    ["People", 1],
                  ].map(([t, n], i) => (
                    <p key={t}>
                      <i className={`legend-${i}`} />
                      {t}
                      <b>{n}</b>
                    </p>
                  ))}
                </div>
              </div>
              <div className="people-note">
                <ProductIcon name="calendar" size={17} />
                <span>
                  Next team check-in <b>Monday, 10:00 AM</b>
                </span>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
const templates = [
  {
    name: "Product update",
    subject: "Something new, made for you.",
    title: "A little update. A lot to explore.",
    body: "We’ve been working on a few thoughtful improvements. Here’s a closer look at what’s new and how it can make your everyday work a little easier.",
  },
  {
    name: "Welcome email",
    subject: "A warm welcome to the team.",
    title: "Good things start here.",
    body: "We’re glad you’re here. Get comfortable, explore your workspace, and take the first step towards a more connected way to work.",
  },
  {
    name: "Event invite",
    subject: "Let’s get together. You’re invited.",
    title: "Make a little room for inspiration.",
    body: "Join us for a conversation about better ways to work. Bring your questions, meet the team, and leave with a few fresh ideas.",
  },
];
function MailView({
  tab,
  notify,
}: {
  tab: string;
  notify: (v: string) => void;
}) {
  const [subject, setSubject] = useState(templates[0].subject);
  const [body, setBody] = useState(templates[0].body);
  const [template, setTemplate] = useState(0);
  const [drafts, setDrafts] = useState([
    {
      name: "October product update",
      audience: "All subscribers",
      status: "Draft",
      opens: "—",
    },
    {
      name: "A warm welcome",
      audience: "New subscribers",
      status: "Sent",
      opens: "38.6%",
    },
    {
      name: "Your next great idea",
      audience: "Product community",
      status: "Sent",
      opens: "32.4%",
    },
  ]);
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("All contacts");
  const contacts = [
    {
      name: "Aarav Sharma",
      email: "aarav@example.com",
      segment: "Product community",
    },
    {
      name: "Maya Patel",
      email: "maya@example.com",
      segment: "New subscribers",
    },
    {
      name: "Sofia Chen",
      email: "sofia@example.com",
      segment: "Product community",
    },
    {
      name: "Noah Williams",
      email: "noah@example.com",
      segment: "New subscribers",
    },
  ];
  const selectTemplate = (i: number) => {
    setTemplate(i);
    setSubject(templates[i].subject);
    setBody(templates[i].body);
  };
  const save = () => {
    setDrafts((a) => [
      {
        name: subject,
        audience: "All subscribers",
        status: "Draft",
        opens: "—",
      },
      ...a,
    ]);
    notify(
      "Your sample draft is saved. Open Campaigns to see it. No email has been sent.",
    );
  };
  return (
    <>
      <Stats
        items={[
          ["Sample audience", "1,248", "Permission-based contacts"],
          ["Campaigns", String(drafts.length), "Keep every message organised"],
          ["Average open rate", "35.5%", "Illustrative engagement data"],
          [
            "Drafts",
            String(drafts.filter((d) => d.status === "Draft").length),
            "Ideas taking shape",
          ],
        ]}
      />
      {tab === "Email builder" ? (
        <div className="email-builder">
          <section>
            <div className="app-panel-heading">
              <h4>Make it your own</h4>
              <span>Draft</span>
            </div>
            <label>
              Start with a template
              <select
                value={template}
                onChange={(e) => selectTemplate(Number(e.target.value))}
              >
                {templates.map((t, i) => (
                  <option value={i} key={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Subject line
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={120}
              />
            </label>
            <label>
              Email content
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                maxLength={1200}
              />
            </label>
            <button
              className="app-primary"
              onClick={save}
              disabled={!subject.trim() || !body.trim()}
            >
              Save sample draft <ProductIcon name="check" size={15} />
            </button>
          </section>
          <section className="email-canvas">
            <span className="preview-label">LIVE EMAIL PREVIEW</span>
            <div className="email-paper">
              <div className="email-wordmark">
                <img
                  src="/brand/arsec-logo.svg"
                  alt="Arsec"
                  width="85"
                  height="20"
                />
              </div>
              <div className={`email-illustration template-${template}`}>
                <ProductIcon
                  name={["grid", "users", "calendar"][template]}
                  size={50}
                />
              </div>
              <h4>{templates[template].title}</h4>
              <b className="email-subject">{subject}</b>
              <p>{body}</p>
              <span className="email-cta">Take a closer look →</span>
              <small>
                You’re receiving this sample preview because good ideas deserve
                a little space.
              </small>
            </div>
          </section>
        </div>
      ) : tab === "Audience" ? (
        <>
          <div className="app-toolbar">
            <div>
              <h4>A little more audience context</h4>
              <p>Fictional contacts. Realistic organisation.</p>
            </div>
            <div className="app-filters">
              <Search
                value={search}
                onChange={setSearch}
                placeholder="Search contacts"
              />
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                aria-label="Filter audience segment"
              >
                <option>All contacts</option>
                <option>Product community</option>
                <option>New subscribers</option>
              </select>
            </div>
          </div>
          <div className="app-table-scroll">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Segment</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .filter(
                    (c) =>
                      (segment === "All contacts" || c.segment === segment) &&
                      `${c.name} ${c.email}`
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map((c, i) => (
                    <tr key={c.name}>
                      <td>
                        <div className="person-cell">
                          <Avatar name={c.name} index={i} />
                          <b>{c.name}</b>
                        </div>
                      </td>
                      <td>{c.email}</td>
                      <td>{c.segment}</td>
                      <td>
                        <span className="app-pill">Subscribed</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="app-toolbar">
            <div>
              <h4>Your campaign workspace</h4>
              <p>A place for every conversation you’re planning.</p>
            </div>
            <span className="app-pill">Email campaigns</span>
          </div>
          <div className="app-table-scroll">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Audience</th>
                  <th>Status</th>
                  <th>Open rate</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((d, i) => (
                  <tr key={`${d.name}-${i}`}>
                    <td>
                      <div className="person-cell">
                        <span className="campaign-icon">
                          <ProductIcon name="mail" size={19} />
                        </span>
                        <b>{d.name}</b>
                      </div>
                    </td>
                    <td>{d.audience}</td>
                    <td>
                      <span
                        className={`app-pill ${d.status === "Draft" ? "amber" : ""}`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td>{d.opens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mail-bottom-note">
            <ProductIcon name="mail" size={27} />
            <div>
              <b>A good email starts with a clear idea.</b>
              <p>
                Open Email builder to create and save your own sample draft.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
function PayrollView({
  tab,
  notify,
}: {
  tab: string;
  notify: (v: string) => void;
}) {
  const [reviewed, setReviewed] = useState(false);
  const [selected, setSelected] = useState(employees[0].name);
  const [search, setSearch] = useState("");
  const gross = employees.reduce((s, p) => s + p.salary, 0);
  const deductions = employees.reduce((s, p) => s + p.deduction, 0);
  const employee = employees.find((e) => e.name === selected)!;
  const download = () => {
    const csv =
      "Employee,Gross,Illustrative deduction,Net\n" +
      employees
        .map(
          (e) =>
            `${e.name},${e.salary},${e.deduction},${e.salary - e.deduction}`,
        )
        .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "arsec-sample-payroll.csv";
    a.click();
    URL.revokeObjectURL(url);
    notify("Sample payroll CSV downloaded. No payments have been processed.");
  };
  return (
    <>
      <Stats
        items={[
          ["Payroll period", "October", "Sample pay run · 2026"],
          ["Employees", String(employees.length), "Included in this preview"],
          ["Gross pay", money(gross), "Illustrative salary totals"],
          ["Net pay", money(gross - deductions), "After sample deductions"],
        ]}
      />
      {tab === "Payslips" ? (
        <div className="payslip-layout">
          <section>
            <div className="app-panel-heading">
              <h4>Employee payslips</h4>
              <span>October</span>
            </div>
            {employees.map((e, i) => (
              <button
                className={`payslip-person ${selected === e.name ? "selected" : ""}`}
                key={e.name}
                onClick={() => setSelected(e.name)}
              >
                <Avatar name={e.name} index={i} />
                <span>
                  <b>{e.name}</b>
                  <small>{e.role}</small>
                </span>
                <span>→</span>
              </button>
            ))}
          </section>
          <section className="payslip-paper">
            <div className="payslip-top">
              <strong>
                <img
                  src="/brand/arsec-logo.svg"
                  alt="Arsec"
                  width="90"
                  height="21"
                />
              </strong>
              <span>
                SAMPLE PAYSLIP
                <br />
                <b>October 2026</b>
              </span>
            </div>
            <h4>{employee.name}</h4>
            <p>
              {employee.role} · {employee.team}
            </p>
            <div className="payslip-line">
              <span>Gross earnings</span>
              <b>{money(employee.salary)}</b>
            </div>
            <div className="payslip-line">
              <span>Illustrative deduction</span>
              <b>− {money(employee.deduction)}</b>
            </div>
            <div className="payslip-net">
              <span>Net pay</span>
              <strong>{money(employee.salary - employee.deduction)}</strong>
            </div>
            <small>
              Fictional sample. Not a statutory payroll calculation or payment
              confirmation.
            </small>
          </section>
        </div>
      ) : (
        <>
          <div className="app-toolbar">
            <div>
              <h4>
                {tab === "Employees"
                  ? "Employee salary overview"
                  : "October pay run"}
              </h4>
              <p>
                {tab === "Employees"
                  ? "A clear view of the inputs behind the numbers."
                  : "A little more clarity before the next step."}
              </p>
            </div>
            {tab === "Employees" ? (
              <Search
                value={search}
                onChange={setSearch}
                placeholder="Search employees"
              />
            ) : (
              <div className="payroll-review">
                <span className={`app-pill ${reviewed ? "" : "amber"}`}>
                  {reviewed ? "Review complete" : "Pending review"}
                </span>
                <button
                  className="app-primary"
                  onClick={() => {
                    setReviewed(!reviewed);
                    notify(
                      reviewed
                        ? "Sample pay run reopened for review."
                        : "Sample review completed. No payments or approvals have been submitted.",
                    );
                  }}
                >
                  {reviewed ? "Reopen review" : "Complete sample review"}
                  <ProductIcon name="check" size={15} />
                </button>
              </div>
            )}
          </div>
          <div className="app-table-scroll">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Gross salary</th>
                  <th>Sample deduction</th>
                  <th>Net pay</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((e) =>
                    e.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((e, i) => (
                    <tr key={e.name}>
                      <td>
                        <div className="person-cell">
                          <Avatar name={e.name} index={i} />
                          <span>
                            <b>{e.name}</b>
                            <small>{e.team}</small>
                          </span>
                        </div>
                      </td>
                      <td>{money(e.salary)}</td>
                      <td>{money(e.deduction)}</td>
                      <td>
                        <b>{money(e.salary - e.deduction)}</b>
                      </td>
                      <td>
                        <span className="app-pill">
                          {reviewed ? "Reviewed" : "Included"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="payroll-total">
            <span>{employees.length} employees · Sample values</span>
            <b>
              Total net pay <strong>{money(gross - deductions)}</strong>
            </b>
            <button onClick={download}>
              <ProductIcon name="download" size={15} /> Export sample CSV
            </button>
          </div>
        </>
      )}
    </>
  );
}
export function ProductDashboard({ product }: { product: ProductDetail }) {
  const [tab, setTab] = useState(product.tabs[0]);
  const [notice, setNotice] = useState("");
  const icon = product.features[0].icon;
  return (
    <div className="product-dashboard" id="product-dashboard">
      <div className="app-window-bar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>
          Arsec {product.name}{" "}
          <span className="app-preview-tag">Interactive preview</span>
        </span>
        <span className="app-window-lock">
          <ProductIcon name="check" size={12} /> Sample workspace
        </span>
      </div>
      <div className="app-shell">
        <aside className="app-sidebar">
          <div className="app-product-logo">
            <span>
              <ProductIcon name={icon} size={23} />
            </span>
            <b>{product.name}</b>
          </div>
          <span className="app-workspace-label">YOUR WORKSPACE</span>
          <div
            className="app-side-tabs"
            onKeyDown={handlePreviewTabKeys}
            role="tablist"
            aria-label={`${product.name} preview views`}
          >
            {product.tabs.map((t, i) => (
              <button
                key={t}
                id={`${product.id}-tab-${i}`}
                role="tab"
                tabIndex={tab === t ? 0 : -1}
                aria-selected={tab === t}
                aria-controls={`${product.id}-panel`}
                onClick={() => {
                  setTab(t);
                  setNotice("");
                }}
              >
                <ProductIcon
                  name={
                    [
                      "grid",
                      product.id === "mail" ? "mail" : "users",
                      product.id === "payroll" ? "file" : "calendar",
                    ][i]
                  }
                  size={17}
                />
                {t}
              </button>
            ))}
          </div>
          <div className="app-sidebar-bottom">
            <span className="app-avatar">AS</span>
            <span>
              <b>Acme Studio</b>
              <small>Sample organisation</small>
            </span>
          </div>
        </aside>
        <div className="app-content">
          <div className="app-topbar">
            <span>
              <span>Workspace</span>
              <span>/</span>
              <b>{tab}</b>
            </span>
            <div>
              <span className="app-demo-badge">
                <i /> Demo mode
              </span>
              <span className="app-notification" aria-hidden>
                <ProductIcon name="bell" size={16} />
              </span>
              <Avatar name="Alex Smith" />
            </div>
          </div>
          <div
            role="tabpanel"
            aria-labelledby={`${product.id}-tab-${product.tabs.indexOf(tab)}`}
            id={`${product.id}-panel`}
            className="app-view"
          >
            <div className="app-page-heading">
              <div>
                <p>
                  {product.id === "recruit"
                    ? "A GREAT HIRE STARTS HERE"
                    : product.id === "people"
                      ? "PEOPLE FIRST. ALWAYS."
                      : product.id === "mail"
                        ? "MAKE EVERY MESSAGE MATTER"
                        : "A CLEARER MONTHLY RHYTHM"}
                </p>
                <h3>
                  {product.id === "recruit"
                    ? "Good people. Great possibilities."
                    : product.id === "people"
                      ? "Good morning, Alex."
                      : product.id === "mail"
                        ? "A little more connection."
                        : "Let’s make payday feel simpler."}
                </h3>
              </div>
              <span className="app-date">October 2026</span>
            </div>
            {notice && (
              <div className="app-notice" role="status">
                <ProductIcon name="check" size={16} />
                <span>{notice}</span>
                <button
                  aria-label="Dismiss notification"
                  onClick={() => setNotice("")}
                >
                  ✕
                </button>
              </div>
            )}
            {product.id === "recruit" ? (
              <RecruitView tab={tab} notify={setNotice} />
            ) : product.id === "people" ? (
              <PeopleView tab={tab} notify={setNotice} />
            ) : product.id === "mail" ? (
              <MailView tab={tab} notify={setNotice} />
            ) : (
              <PayrollView tab={tab} notify={setNotice} />
            )}
          </div>
          <div className="app-preview-footer">
            <span>
              <i /> Illustrative product experience
            </span>
            <span>Fictional data · Changes reset on reload</span>
          </div>
        </div>
      </div>
    </div>
  );
}
