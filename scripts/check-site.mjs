import http from "node:http";
import fs from "node:fs";
const base = process.env.TEST_SITE_URL || "http://localhost:3000";
const manifest = JSON.parse(
  fs.readFileSync(".next/prerender-manifest.json", "utf8"),
);
const routes = Object.keys(manifest.routes).filter((p) => !p.startsWith("/_"));
const get = (path) =>
  new Promise((resolve, reject) => {
    const req = http.get(base + path, (res) => {
      let body = "";
      res.on("data", (d) => (body += d));
      res.on("end", () => resolve({ path, status: res.statusCode, body }));
    });
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error("Timeout " + path));
    });
    req.on("error", reject);
  });
const failures = [];
const links = new Set();
const resources = new Set([
  "/brand/arsec.svg",
  "/theme/GTWalsheimPro-Regular.woff2",
  "/theme/GTWalsheimPro-Medium.woff2",
  "/theme/GTWalsheimPro-Bold.woff2",
]);
let pages = 0;
for (let i = 0; i < routes.length; i += 5) {
  const batch = await Promise.all(routes.slice(i, i + 5).map(get));
  for (const r of batch) {
    if (r.status !== 200) failures.push(`${r.path}: ${r.status}`);
    if (!r.path.match(/\.(png|svg|xml|txt)$/)) {
      pages++;
      if (!r.body.includes('id="main"'))
        failures.push("Missing main: " + r.path);
      if (r.body.includes("SaasFlow"))
        failures.push("Stale branding: " + r.path);
      if (!r.body.includes("/brand/arsec-logo.svg"))
        failures.push("Missing full Arsec logo: " + r.path);
      for (const anchor of r.body.matchAll(/href="#([^"\s]+)"/g)) {
        if (!r.body.includes('id="' + anchor[1] + '"'))
          failures.push("Missing anchor " + anchor[1] + " on " + r.path);
      }
      if (r.path.startsWith("/products/")) {
        for (const id of [
          "overview",
          "features",
          "workspace",
          "questions",
          "product-dashboard",
        ])
          if (!r.body.includes('id="' + id + '"'))
            failures.push("Missing product section " + id + " on " + r.path);
        if (!r.body.includes('role="tablist"'))
          failures.push("Missing preview tabs: " + r.path);
      }
      for (const m of r.body.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
        const href = m[1].replaceAll("&amp;", "&");
        if (href.startsWith("/") && !href.startsWith("//")) {
          if (
            href.startsWith("/_next/") ||
            href.startsWith("/brand/") ||
            href.startsWith("/theme/")
          )
            resources.add(href);
          else links.add(href.split("#")[0]);
        }
      }
    }
  }
}
for (const path of links) {
  if (!path) continue;
  const r = await get(path);
  if (r.status !== 200)
    failures.push("Broken internal link: " + path + " " + r.status);
}
for (const path of resources) {
  const r = await get(path);
  if (r.status !== 200)
    failures.push("Broken resource: " + path + " " + r.status);
}
const missing = await get("/not-a-real-arsec-page");
if (missing.status !== 404) failures.push("Missing route did not return 404");
console.log(
  JSON.stringify(
    {
      pages,
      generatedRoutes: routes.length,
      internalLinks: links.size,
      resources: resources.size,
      missingPageStatus: missing.status,
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
