"use client";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { useState } from "react";
import { productDetails, type ProductDetail } from "@/content/products";
import { ProductDashboard, handlePreviewTabKeys } from "./ProductDashboard";
import { ProductIcon, productStyle } from "./ProductIcon";
const iconFor = (p: ProductDetail) =>
  ({ recruit: "users", people: "users", mail: "mail", payroll: "file" })[p.id];
export function ProductExperience({ product: p }: { product: ProductDetail }) {
  return (
    <main
      id="main"
      className="saas-product"
      style={productStyle(p.accent, p.tint)}
    >
      <div className="product-subnav">
        <div className="saas-wrap">
          <Link className="product-name" href={p.path}>
            <span className="product-mark">
              <ProductIcon name={iconFor(p)} size={19} />
            </span>
            <b>{p.name}</b>
          </Link>
          <nav aria-label={`${p.name} sections`}>
            <a href="#overview">Overview</a>
            <a href="#features">Features</a>
            <a href="#workspace">Explore the UI</a>
            <a href="#questions">FAQs</a>
          </nav>
          <Link className="product-nav-demo" href="/resources/contact-us">
            Get a demo <span>↗</span>
          </Link>
        </div>
      </div>
      <section id="overview" className="product-hero saas-wrap">
        <div className="product-eyebrow">
          <span /> ARSEC {p.name.toUpperCase()}
          <span className="eyebrow-divider">/</span>
          {p.label}
        </div>
        <h1>
          {p.headline.split("\n").map((s, i) => (
            <span key={s} className={i === 1 ? "accent-line" : ""}>
              {s}
            </span>
          ))}
        </h1>
        <p>{p.description}</p>
        <div className="saas-actions">
          <Link className="saas-button primary" href="/resources/contact-us">
            Book a product demo <ProductIcon name="arrow" size={17} />
          </Link>
          <a className="saas-button secondary" href="#workspace">
            <span className="small-play">▷</span>Explore the workspace
          </a>
        </div>
        <div className="hero-assurance">
          <span>
            <ProductIcon name="check" size={14} /> A workspace built around
            people
          </span>
          <span>
            <ProductIcon name="grid" size={14} /> A clearer way to work
          </span>
        </div>
      </section>
      <section
        id="workspace"
        className="dashboard-section saas-wrap"
        aria-label={`${p.label} interactive dashboard`}
      >
        <div className="dashboard-top-label">
          <span>
            <i /> A little closer to your everyday.
          </span>
          <span>
            Click around. Make it your own. <span>↙</span>
          </span>
        </div>
        <ProductDashboard product={p} />
        <p className="dashboard-caption">
          An interactive design preview with sample data. Product scope and
          availability are confirmed in your walkthrough.
        </p>
      </section>
      <section className="product-benefit-strip saas-wrap">
        {[
          ["One shared view", "Less time finding. More time doing."],
          ["Thoughtful by design", "Clear interfaces for everyday work."],
          [
            "Built for your next chapter",
            "A considered approach to growing teams.",
          ],
        ].map(([t, d]) => (
          <div key={t}>
            <span className="benefit-check">
              <ProductIcon name="check" size={19} />
            </span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </div>
        ))}
      </section>
      <section id="features" className="product-features saas-section">
        <div className="saas-wrap">
          <div className="saas-section-heading">
            <span className="saas-kicker">
              LESS FRICTION. MORE POSSIBILITY.
            </span>
            <h2>
              The details that make
              <br />
              the everyday feel easier.
            </h2>
            <p>{p.tagline}</p>
          </div>
          <div className="saas-feature-grid">
            {p.features.map((f) => (
              <article key={f.title}>
                <span className="feature-icon">
                  <ProductIcon name={f.icon} size={25} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="saas-wrap saas-section workflow-section">
        <div>
          <span className="saas-kicker">A BETTER WAY TO GET THERE</span>
          <h2>
            Start simple.
            <br />
            Build from there.
          </h2>
          <p>
            Bring a little clarity to the way your team works. We’ll help you
            find the right starting point.
          </p>
          <Link href="/resources/contact-us" className="saas-text-link">
            Let’s talk about your workflow{" "}
            <ProductIcon name="arrow" size={17} />
          </Link>
        </div>
        <div className="workflow-list">
          {p.workflow.map(([t, d], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <ProductIcon name={["grid", "users", "check"][i]} size={22} />
            </article>
          ))}
        </div>
      </section>
      <section className="connected-suite">
        <div className="saas-wrap">
          <div>
            <span className="saas-kicker">BETTER, TOGETHER</span>
            <h2>
              A little more connected.
              <br />
              Across your whole team.
            </h2>
            <p>
              Explore the rest of the Arsec product family. Map the connections
              your business needs, from hiring to payday.
            </p>
            <Link href="/products" className="saas-text-link">
              Meet the product family <ProductIcon name="arrow" size={17} />
            </Link>
          </div>
          <div className="suite-orbit">
            <div className="orbit-centre">
              <img
                src="/brand/arsec-logo.svg"
                alt="Arsec"
                width="108"
                height="25"
              />
            </div>
            {productDetails.map((product, i) => (
              <Link
                key={product.id}
                href={product.path}
                className={`orbit-product orbit-${i} ${product.id === p.id ? "current" : ""}`}
                style={productStyle(product.accent, product.tint)}
              >
                <span>
                  <ProductIcon name={iconFor(product)} size={22} />
                </span>
                <b>{product.name}</b>
              </Link>
            ))}
            <div className="orbit-ring" aria-hidden />
          </div>
        </div>
      </section>
      <section id="questions" className="saas-wrap saas-section product-faq">
        <div>
          <span className="saas-kicker">A LITTLE MORE CLARITY</span>
          <h2>
            Good questions.
            <br />
            Straight answers.
          </h2>
          <Link className="saas-text-link" href="/resources/contact-us">
            Ask us something else <ProductIcon name="arrow" size={17} />
          </Link>
        </div>
        <div>
          {p.faq.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="product-final-cta saas-wrap">
        <span className="product-mark">
          <ProductIcon name={iconFor(p)} size={27} />
        </span>
        <span className="saas-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          Make more room
          <br />
          for the work that matters.
        </h2>
        <p>
          Take a closer look at Arsec {p.name} with your team’s workflow in
          mind.
        </p>
        <Link className="saas-button primary" href="/resources/contact-us">
          Let’s find your starting point <ProductIcon name="arrow" size={17} />
        </Link>
      </section>
      <div className="product-back-link saas-wrap">
        <Link href="/products">← Explore all Arsec products</Link>
      </div>
    </main>
  );
}
export function ProductsOverview({ home = false }: { home?: boolean }) {
  const [active, setActive] = useState(0);
  const p = productDetails[active];
  return (
    <main
      id="main"
      className={`saas-product product-overview ${home ? "saas-home" : ""}`}
      style={productStyle(brand.green, brand.tint)}
    >
      <section className="suite-hero saas-wrap">
        <div className="hero-brand-art" aria-hidden="true">
          <img src="/brand/arsec.svg" alt="" width="30" height="30" />
        </div>
        <span className="suite-hero-label">
          <i />{" "}
          {home
            ? "GOOD SOFTWARE. BETTER WORKDAYS."
            : "THE ARSEC PRODUCT FAMILY"}
        </span>
        <h1>
          {home ? (
            <>
              Less busywork.
              <br />
              More <span>possibility.</span>
            </>
          ) : (
            <>
              Good work starts with
              <br />
              <span>great software.</span>
            </>
          )}
        </h1>
        <p>
          Thoughtful tools for the people behind your business.
          <br className="desktop-break" /> Hire your next great teammate.
          Simplify HR. Make every message count.
        </p>
        <div className="saas-actions">
          <a className="saas-button primary" href="#products">
            Find your product <ProductIcon name="arrow" size={17} />
          </a>
          <Link className="saas-button secondary" href="/resources/contact-us">
            Let’s talk about your team
          </Link>
        </div>
        <div className="suite-hero-line" aria-hidden>
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>
      <section id="products" className="saas-wrap suite-product-cards">
        {productDetails.map((product) => (
          <Link
            href={product.path}
            className="suite-product-card"
            key={product.id}
            style={productStyle(product.accent, product.tint)}
          >
            <div className="suite-card-top">
              <span className="product-mark">
                <ProductIcon name={iconFor(product)} size={26} />
              </span>
              <span className="suite-card-arrow">
                <ProductIcon name="arrow" size={20} />
              </span>
            </div>
            <h2>{product.name}</h2>
            <span className="suite-card-label">{product.label}</span>
            <p>{product.tagline}</p>
            <div className={`mini-product mini-${product.id}`} aria-hidden>
              {product.id === "recruit" ? (
                <>
                  <div className="mini-cols">
                    {[0, 1, 2].map((i) => (
                      <div key={i}>
                        <span>{["Applied", "Interview", "Offer"][i]}</span>
                        {Array.from({ length: 3 - i }, (_, j) => (
                          <i key={j}>
                            <b />
                            {["Alex Morgan", "Maya Patel", "Daniel Kim"][j]}
                          </i>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : product.id === "people" ? (
                <>
                  <div className="mini-people-title">
                    Your people, connected.<span>6 team members</span>
                  </div>
                  <div className="mini-avatars">
                    {["AM", "MP", "SC", "NW", "IK", "DK"].map((n, i) => (
                      <span key={n} className={`avatar-${i % 4}`}>
                        {n}
                      </span>
                    ))}
                  </div>
                </>
              ) : product.id === "mail" ? (
                <>
                  <div className="mini-email">
                    <span>✳</span>
                    <b>
                      A little update.
                      <br />A lot to explore.
                    </b>
                    <i />
                    <i />
                    <small>Take a closer look →</small>
                  </div>
                </>
              ) : (
                <>
                  <div className="mini-pay">
                    <span>
                      October pay run <b>Ready to review</b>
                    </span>
                    <strong>₹4,70,700</strong>
                    <small>Total sample net pay</small>
                    <div>
                      {[60, 80, 65, 95, 75, 85].map((h, i) => (
                        <i key={i} style={{ height: h + "%" }} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <span className="suite-card-link">
              Explore {product.name} <ProductIcon name="arrow" size={15} />
            </span>
          </Link>
        ))}
      </section>
      <section className="saas-wrap saas-section suite-preview-section">
        <div className="saas-section-heading">
          <span className="saas-kicker">
            SOFTWARE THAT FEELS LIKE A LITTLE LESS WORK
          </span>
          <h2>
            See your work.
            <br />
            From a clearer perspective.
          </h2>
          <p>
            Four focused products. One thoughtful approach to your everyday.
          </p>
        </div>
        <div
          className="suite-preview-tabs"
          onKeyDown={handlePreviewTabKeys}
          role="tablist"
          aria-label="Choose a product preview"
        >
          {productDetails.map((product, i) => (
            <button
              key={product.id}
              id={`suite-tab-${i}`}
              role="tab"
              tabIndex={i === active ? 0 : -1}
              aria-controls="suite-preview-panel"
              aria-selected={i === active}
              style={productStyle(product.accent, product.tint)}
              onClick={() => setActive(i)}
            >
              <ProductIcon name={iconFor(product)} size={18} />
              {product.name}
            </button>
          ))}
        </div>
        <div
          id="suite-preview-panel"
          role="tabpanel"
          aria-labelledby={`suite-tab-${active}`}
          style={productStyle(p.accent, p.tint)}
        >
          <ProductDashboard key={p.id} product={p} />
        </div>
        <div className="suite-preview-bottom">
          <p>Interactive preview · Fictional sample data</p>
          <Link
            href={p.path}
            className="saas-text-link"
            style={productStyle(p.accent, p.tint)}
          >
            A closer look at {p.name} <ProductIcon name="arrow" size={17} />
          </Link>
        </div>
      </section>
      <section className="suite-values">
        <div className="saas-wrap">
          <div>
            <span className="saas-kicker">
              BUILT WITH A LITTLE MORE INTENTION
            </span>
            <h2>
              Your business is complex.
              <br />
              Your software shouldn’t feel it.
            </h2>
          </div>
          <div className="suite-value-grid">
            {[
              [
                "users",
                "People at the centre",
                "Clear interfaces shaped around the work people actually do.",
              ],
              [
                "grid",
                "A place for everything",
                "Bring everyday information and workflows into an organised view.",
              ],
              [
                "link",
                "Room to grow together",
                "Plan the right connections across your people, processes, and systems.",
              ],
            ].map(([icon, t, d]) => (
              <article key={t}>
                <ProductIcon name={icon} size={29} />
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {home && (
        <section className="saas-wrap saas-section home-services-clean">
          <div>
            <span className="saas-kicker">BEYOND THE EVERYDAY</span>
            <h2>
              Good software.
              <br />
              And the thinking behind it.
            </h2>
            <p>
              Explore services for your applications, cloud, data, and
              enterprise platforms. Start with the problem. Build the right way
              forward.
            </p>
            <Link className="saas-text-link" href="/services">
              Explore what we do <ProductIcon name="arrow" size={17} />
            </Link>
          </div>
          <div>
            {[
              [
                "Applications & engineering",
                "/services/capabilities/application-engineering-and-services",
              ],
              ["AI & data", "/services/capabilities/artificial-intelligence"],
              [
                "Cloud & infrastructure",
                "/services/capabilities/cloud-and-infrastructure",
              ],
              [
                "Enterprise platforms",
                "/services/capabilities/enterprise-platforms",
              ],
            ].map(([t, path]) => (
              <Link key={path} href={path}>
                {t}
                <ProductIcon name="arrow" size={20} />
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="product-final-cta saas-wrap">
        <span className="saas-kicker">
          A BETTER WORKDAY IS A GOOD PLACE TO START
        </span>
        <h2>
          Find the right tools.
          <br />
          Make a little more possible.
        </h2>
        <p>
          Tell us what your team needs. We’ll help you find your starting point.
        </p>
        <Link className="saas-button primary" href="/resources/contact-us">
          Start a conversation <ProductIcon name="arrow" size={17} />
        </Link>
      </section>
    </main>
  );
}
