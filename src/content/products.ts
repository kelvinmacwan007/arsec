import { brand } from "@/lib/brand";
export type ProductId = "recruit" | "people" | "mail" | "payroll";
export type ProductDetail = {
  id: ProductId;
  path: string;
  name: string;
  label: string;
  tagline: string;
  headline: string;
  accent: string;
  tint: string;
  description: string;
  tabs: string[];
  features: { icon: string; title: string; description: string }[];
  workflow: [string, string][];
  faq: [string, string][];
};
export const productDetails: ProductDetail[] = [
  {
    id: "recruit",
    path: "/products/applicant-tracking-system",
    name: "Recruit",
    label: "Applicant Tracking System",
    tagline: "Make room for your next great hire.",
    headline: "Great teams start with\na better hiring experience.",
    accent: brand.green,
    tint: brand.tint,
    description:
      "A clearer path from first application to final decision. Bring your candidates, conversations, and hiring team into one organised workspace.",
    tabs: ["Pipeline", "Candidates", "Interviews"],
    features: [
      {
        icon: "columns",
        title: "A pipeline that makes sense",
        description:
          "See where every conversation stands, with clear stages and a shared view for your team.",
      },
      {
        icon: "users",
        title: "People, with context",
        description:
          "Keep candidate details, skills, and evaluation notes together throughout the hiring journey.",
      },
      {
        icon: "calendar",
        title: "Interviews without the scramble",
        description:
          "Give hiring managers a clear view of upcoming conversations and who is involved.",
      },
      {
        icon: "check",
        title: "More considered decisions",
        description:
          "Structure feedback around the requirements of the role and the strengths of each candidate.",
      },
      {
        icon: "chart",
        title: "Clarity at every stage",
        description:
          "Explore the shape of your hiring funnel and identify where candidates need attention.",
      },
      {
        icon: "link",
        title: "A connected hiring process",
        description:
          "Plan handoffs between hiring, onboarding, and the rest of your people operations.",
      },
    ],
    workflow: [
      [
        "Create your hiring workspace",
        "Map roles, stages, and the people involved in each decision.",
      ],
      [
        "Bring your team together",
        "Keep candidate reviews and interview plans in a shared place.",
      ],
      [
        "Move the right conversations forward",
        "Review progress and give every next step a clear owner.",
      ],
    ],
    faq: [
      [
        "Can I try the hiring dashboard?",
        "Yes. Use the preview below to search candidates, change roles, explore interviews, and move a candidate to the next stage. Changes last for this page session.",
      ],
      [
        "Can the hiring stages match our process?",
        "The preview illustrates a simple pipeline. Your required stages, permissions, integrations, and product availability can be discussed in a walkthrough.",
      ],
      [
        "Does the preview contain real candidates?",
        "No. All names, roles, and records in the dashboard are fictional sample data.",
      ],
    ],
  },
  {
    id: "people",
    path: "/products/hrms",
    name: "People",
    label: "HRMS",
    tagline: "A little less admin. A lot more people.",
    headline: "Put your people at the\ncentre of every workday.",
    accent: brand.green,
    tint: brand.tint,
    description:
      "From a new starter’s first day to everyday time off. Give people operations a calmer home, with employee information and team requests in one place.",
    tabs: ["Overview", "Employees", "Time off"],
    features: [
      {
        icon: "users",
        title: "Know your people",
        description:
          "Organise employee profiles, departments, and roles in an easy-to-explore directory.",
      },
      {
        icon: "calendar",
        title: "Time off, in a clearer view",
        description:
          "Bring requests and approval decisions into a consistent, visible workflow.",
      },
      {
        icon: "check",
        title: "A thoughtful first day",
        description:
          "Plan onboarding tasks, documents, and introductions around the employee journey.",
      },
      {
        icon: "clock",
        title: "Everyday work, organised",
        description:
          "Give attendance and daily people processes a clear structure and owner.",
      },
      {
        icon: "chart",
        title: "Understand your team",
        description:
          "Explore useful people information without losing sight of privacy and access.",
      },
      {
        icon: "link",
        title: "Connect people and payroll",
        description:
          "Map the information and approvals that need to flow into each payroll cycle.",
      },
    ],
    workflow: [
      [
        "Start with your people",
        "Organise employee information and define how your teams work.",
      ],
      [
        "Shape everyday workflows",
        "Bring onboarding, requests, and approvals into a consistent process.",
      ],
      [
        "Make space for better work",
        "Use a shared view to keep people operations moving.",
      ],
    ],
    faq: [
      [
        "Can I interact with the HR preview?",
        "Yes. Explore the employee directory, filter departments, and approve or decline sample time-off requests. The preview updates its request counts immediately.",
      ],
      [
        "Can we bring existing employee information?",
        "Data migration, required fields, access policies, and integrations will be scoped during discovery.",
      ],
      [
        "Is employee information saved here?",
        "No. This is a browser preview with fictional employee records. Changes reset when the page reloads.",
      ],
    ],
  },
  {
    id: "mail",
    path: "/products/mass-mail",
    name: "Campaigns",
    label: "Mass Mail",
    tagline: "Thoughtful emails. Meaningful connections.",
    headline: "Good conversations\nstart with a great email.",
    accent: brand.green,
    tint: brand.tint,
    description:
      "Bring your audience, message, and campaign planning together. Create a considered email experience, then see how the pieces fit before your next send.",
    tabs: ["Campaigns", "Email builder", "Audience"],
    features: [
      {
        icon: "mail",
        title: "Messages with a little more care",
        description:
          "Build an email around a clear subject, useful content, and a focused next step.",
      },
      {
        icon: "users",
        title: "The right audience",
        description:
          "Plan campaigns around relevant segments and permission-based contact lists.",
      },
      {
        icon: "columns",
        title: "A clear campaign workspace",
        description:
          "Keep drafts, planned campaigns, and past activity easy to find.",
      },
      {
        icon: "calendar",
        title: "A considered send schedule",
        description:
          "Give campaign reviews and scheduling a place in your team’s workflow.",
      },
      {
        icon: "chart",
        title: "Learn from every campaign",
        description:
          "Review delivery and engagement measures in a single, readable view.",
      },
      {
        icon: "check",
        title: "Review before you reach out",
        description:
          "Preview the message and audience before moving to a live delivery setup.",
      },
    ],
    workflow: [
      [
        "Find your audience",
        "Start with relevant, permission-based contacts and clear segments.",
      ],
      [
        "Make the message your own",
        "Shape the subject and content, then review the email preview.",
      ],
      [
        "Plan your next conversation",
        "Agree the review process and the delivery setup your team needs.",
      ],
    ],
    faq: [
      [
        "Can I edit an email in the preview?",
        "Yes. Open Email builder to edit the subject and content, switch templates, and save a sample campaign draft.",
      ],
      [
        "Does the preview send real emails?",
        "No. Campaign drafts stay in this page session. A live email provider and verified sending configuration are needed for actual delivery.",
      ],
      [
        "Can we use our own contacts?",
        "Contact import, consent requirements, delivery volumes, and integration needs can be discussed in a product walkthrough.",
      ],
    ],
  },
  {
    id: "payroll",
    path: "/products/payroll-management-system",
    name: "Payroll",
    label: "Payroll Management System",
    tagline: "A smoother month, from input to review.",
    headline: "Less payroll complexity.\nMore peace of mind.",
    accent: brand.green,
    tint: brand.tint,
    description:
      "Make the monthly payroll process easier to follow. Bring employee inputs, salary components, and review steps into a structured workspace.",
    tabs: ["Pay run", "Employees", "Payslips"],
    features: [
      {
        icon: "columns",
        title: "Your pay run, at a glance",
        description:
          "See the month’s sample totals and review state in one clear workspace.",
      },
      {
        icon: "users",
        title: "Employee inputs, connected",
        description:
          "Bring salary components and payroll inputs into a consistent employee view.",
      },
      {
        icon: "check",
        title: "A review before the next step",
        description:
          "Use checks and approvals to make ownership clear before finalising payroll.",
      },
      {
        icon: "file",
        title: "Payslips that explain the details",
        description:
          "Show earnings, deductions, and net pay in a simple employee-facing format.",
      },
      {
        icon: "chart",
        title: "Clear payroll summaries",
        description:
          "Review totals and understand how individual inputs contribute to the cycle.",
      },
      {
        icon: "link",
        title: "A joined-up monthly process",
        description:
          "Plan the handoffs between HR information, approvals, and accounting outputs.",
      },
    ],
    workflow: [
      [
        "Bring the inputs together",
        "Review employee data, attendance inputs, and salary components.",
      ],
      [
        "Check the details",
        "Inspect the pay run and resolve questions before approval.",
      ],
      [
        "Complete your review",
        "Agree the live approval, payment, and payslip delivery requirements.",
      ],
    ],
    faq: [
      [
        "Does the preview process payments?",
        "No. It lets you inspect a fictional pay run, complete a sample review, and preview payslips. No money moves.",
      ],
      [
        "Are the payroll numbers statutory calculations?",
        "No. Sample amounts use simple illustrative deductions and are not a tax or compliance calculation. Country-specific payroll rules must be scoped separately.",
      ],
      [
        "Can we connect payroll to our HR and accounting systems?",
        "The required data, approval rules, and accounting exports can be mapped during discovery. Availability and integration scope will be confirmed in your walkthrough.",
      ],
    ],
  },
];
export const findProduct = (path: string) =>
  productDetails.find((p) => p.path === path);
