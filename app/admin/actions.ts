// Designed and Developed by Forge9x Ltd
"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/adminAuth";
import {
  CONTENT_TAG,
  DETAIL_FIELDS,
  SOCIAL_FIELDS,
  cleanUsername,
  isSlotId,
  readContentFresh,
  removeImage,
  saveContent,
  storageReady,
  storeImage,
} from "@/lib/content";

const back = (query: string): never => redirect(`/admin?${query}`);

// Every action that changes something starts here: signed in, and storage connected.
async function guard() {
  if (!(await isAdmin())) redirect("/admin");
  if (!storageReady()) back("error=" + encodeURIComponent("Storage is not connected yet."));
}

// Make the public pages pick up the change straight away.
function publish() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

export async function signIn(form: FormData) {
  const ok = passwordMatches(String(form.get("password") ?? ""));
  if (!ok) {
    // A short pause on every wrong guess slows down anyone trying passwords one after another.
    await new Promise((r) => setTimeout(r, 1200));
    back("error=" + encodeURIComponent("That password is not right."));
  }
  await startSession();
  redirect("/admin");
}

export async function signOut() {
  await endSession();
  redirect("/admin");
}

const PHONE = /^\+?[0-9]{7,15}$/;

export async function saveDetails(form: FormData) {
  await guard();
  const content = await readContentFresh();
  for (const f of DETAIL_FIELDS) {
    let value = String(form.get(f.id) ?? "").trim();
    if (f.id === "phone" || f.id === "whatsapp") {
      value = value.replace(/[\s()-]/g, "");
      if (value && !PHONE.test(value)) back("error=" + encodeURIComponent(`${f.label}: use digits only, starting with the country code, for example +94771234567.`));
    }
    if (f.id === "since" && value && !/^(19|20)\d{2}$/.test(value)) {
      back("error=" + encodeURIComponent("Founding year: enter a four-digit year, for example 2020."));
    }
    if (value.length > f.max) back("error=" + encodeURIComponent(`${f.label} is too long (${f.max} characters at most).`));
    // An empty box means "use the built-in value again".
    if (value) content.details[f.id] = value;
    else delete content.details[f.id];
  }
  await saveContent(content);
  publish();
  back("saved=" + encodeURIComponent("Shop details saved."));
}

export async function saveSocial(form: FormData) {
  await guard();
  const content = await readContentFresh();
  for (const f of SOCIAL_FIELDS) {
    const typed = String(form.get(f.id) ?? "").trim();
    const name = cleanUsername(typed);
    if (typed && !name) back("error=" + encodeURIComponent(`${f.label}: that does not look like a username.`));
    if (name) content.social[f.id] = name;
    else delete content.social[f.id];
  }
  await saveContent(content);
  publish();
  back("saved=" + encodeURIComponent("Social media saved."));
}

export async function uploadImage(form: FormData) {
  await guard();
  const slot = form.get("slot");
  const file = form.get("file");
  if (!isSlotId(slot)) return back("error=" + encodeURIComponent("Unknown picture."));
  if (!(file instanceof File) || file.size === 0) return back("error=" + encodeURIComponent("Choose a picture first."));
  const result = await storeImage(slot, file);
  if ("error" in result) return back("error=" + encodeURIComponent(result.error));
  const content = await readContentFresh();
  const previous = content.images[slot];
  content.images[slot] = result.url;
  await saveContent(content);
  await removeImage(previous);
  publish();
  back("saved=" + encodeURIComponent("Picture replaced."));
}

export async function resetImage(form: FormData) {
  await guard();
  const slot = form.get("slot");
  if (!isSlotId(slot)) return back("error=" + encodeURIComponent("Unknown picture."));
  const content = await readContentFresh();
  const previous = content.images[slot];
  delete content.images[slot];
  await saveContent(content);
  await removeImage(previous);
  publish();
  back("saved=" + encodeURIComponent("Original picture restored."));
}
