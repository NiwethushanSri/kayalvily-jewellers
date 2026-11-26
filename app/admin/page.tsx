// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, isAdmin } from "@/lib/adminAuth";
import { DETAIL_FIELDS, IMAGE_SLOTS, SOCIAL_FIELDS, readContentFresh, storageReady } from "@/lib/content";
import { productGroups } from "@/lib/products";
import { TEXT_GROUPS } from "@/lib/texts";
import AdminPhoto from "@/components/AdminPhoto";
import { site } from "@/lib/site";
import { resetImage, saveDetails, saveSocial, saveText, signIn, signOut, uploadImage } from "./actions";

export const metadata: Metadata = { title: `Admin | ${site.name}`, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// What each box shows while nothing has been saved for it.
const builtIn: Record<string, string> = {
  tagline: site.tagline,
  addressLine1: site.address.line1,
  addressLine2: site.address.line2,
  town: site.address.town,
  phone: site.phones.primary,
  whatsapp: site.phones.whatsappLK,
  owner: site.owner,
  since: site.since,
};

// The picture a slot shows when no replacement has been uploaded.
function original(slot: (typeof IMAGE_SLOTS)[number]) {
  if (slot.fallback) return slot.fallback;
  const group = slot.id.replace("tile-", "");
  return productGroups.find((g) => g.id === group)?.items[group === "featured" ? 2 : 0]?.image ?? "";
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { saved, error } = await searchParams;
  const notice = (
    <>
      {saved && <p className="admin-note ok" role="status">{saved}</p>}
      {error && <p className="admin-note bad" role="alert">{error}</p>}
    </>
  );

  if (!adminConfigured()) {
    return (
      <section className="admin">
        <div className="container admin-narrow">
          <h1>Admin</h1>
          <p>The admin area is switched off until an admin password is set in the hosting settings (ADMIN_PASSWORD, at least 10 characters).</p>
        </div>
      </section>
    );
  }

  if (!(await isAdmin())) {
    return (
      <section className="admin">
        <div className="container admin-narrow">
          <h1>Admin sign in</h1>
          {notice}
          <form action={signIn} className="admin-card">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
            <button className="btn" type="submit">Sign in</button>
          </form>
        </div>
      </section>
    );
  }

  const content = await readContentFresh();

  return (
    <section className="admin">
      <div className="container">
        <div className="admin-head">
          <h1>Admin</h1>
          <div className="admin-head-actions">
            <Link href="/" target="_blank">View site</Link>
            <form action={signOut}><button type="submit" className="admin-link">Sign out</button></form>
          </div>
        </div>
        {notice}
        {!storageReady() && <p className="admin-note bad" role="alert">Storage is not connected, so changes cannot be saved yet.</p>}

        <form action={saveDetails} className="admin-card">
          <h2>Shop details</h2>
          <p className="admin-help">Leave a box empty to go back to the original wording.</p>
          <div className="admin-fields">
            {DETAIL_FIELDS.map((f) => (
              <div key={f.id} className={f.id === "tagline" ? "wide" : undefined}>
                <label htmlFor={f.id}>{f.label}</label>
                <input id={f.id} name={f.id} defaultValue={content.details[f.id] ?? ""} placeholder={builtIn[f.id]} maxLength={f.max} />
              </div>
            ))}
          </div>
          <button className="btn" type="submit">Save shop details</button>
        </form>

        <form action={saveSocial} className="admin-card">
          <h2>Social media</h2>
          <p className="admin-help">Type the username (for example kayalvilyjewellers) or paste the full profile link. A network left empty shows its logo but is not clickable.</p>
          <div className="admin-fields">
            {SOCIAL_FIELDS.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id}>{f.label} username or link</label>
                <input id={f.id} name={f.id} defaultValue={content.social[f.id] ?? ""} maxLength={200} autoCapitalize="none" spellCheck={false} />
              </div>
            ))}
          </div>
          <button className="btn" type="submit">Save social media</button>
        </form>

        <div className="admin-card">
          <h2>Page wording</h2>
          <p className="admin-help">
            Open a page, change the wording and save. Empty a box to go back to the original wording. You can
            write {"{name}"}, {"{town}"}, {"{owner}"} or {"{tagline}"} and the shop details are filled in for you.
          </p>
          {TEXT_GROUPS.map((group) => (
            <details className="admin-page-text" id={`text-${group.id}`} key={group.id}>
              <summary>{group.label}</summary>
              <form action={saveText}>
                <input type="hidden" name="group" value={group.id} />
                <div className="admin-fields">
                  {group.fields.map((f) => (
                    <div key={f.id} className={f.long ? "wide" : undefined}>
                      <label htmlFor={f.id}>{f.label}</label>
                      {f.long ? (
                        <textarea id={f.id} name={f.id} defaultValue={content.text[f.id] ?? f.def} maxLength={f.max} rows={f.max > 250 ? 5 : 2} />
                      ) : (
                        <input id={f.id} name={f.id} defaultValue={content.text[f.id] ?? f.def} maxLength={f.max} />
                      )}
                    </div>
                  ))}
                </div>
                <button className="btn" type="submit">Save {group.label.toLowerCase()} wording</button>
              </form>
            </details>
          ))}
        </div>

        <div className="admin-card">
          <h2>Photos</h2>
          <p className="admin-help">JPG, PNG, WebP or AVIF, up to 4 MB each. A new photo appears on the site straight away.</p>
          <div className="admin-photos">
            {IMAGE_SLOTS.map((slot) => {
              const custom = content.images[slot.id];
              return (
                <div className="admin-photo" key={slot.id}>
                  <h3>{slot.label}</h3>
                  <AdminPhoto src={custom ?? original(slot)} />
                  <p className="admin-size">Best size: {slot.size} or larger, same shape</p>
                  <p className="admin-help">{custom ? "Showing your uploaded photo." : "Showing the original photo."} {slot.hint}</p>
                  <form action={uploadImage}>
                    <input type="hidden" name="slot" value={slot.id} />
                    <input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/avif" required aria-label={`New picture for ${slot.label}`} />
                    <button className="btn" type="submit">Upload</button>
                  </form>
                  {custom && (
                    <form action={resetImage}>
                      <input type="hidden" name="slot" value={slot.id} />
                      <button type="submit" className="admin-link">Use the original photo again</button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
