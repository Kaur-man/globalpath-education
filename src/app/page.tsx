import HomeClient from "../components/HomeClient";
import { Service, Destination, SuccessStory } from "../lib/types";

export const dynamic = "force-dynamic";

async function getServices(): Promise<Service[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/services?select=*&is_published=eq.true&order=id.asc`;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
    const res = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Error fetching services:", e);
    return [];
  }
}

async function getDestinations(): Promise<Destination[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/destinations?select=*&is_published=eq.true&order=id.asc`;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
    const res = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Error fetching destinations:", e);
    return [];
  }
}

async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/success_stories?select=*&is_published=eq.true&order=id.desc`;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
    const res = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Error fetching success stories:", e);
    return [];
  }
}

export default async function HomePage() {
  const [services, destinations, stories] = await Promise.all([
    getServices(),
    getDestinations(),
    getSuccessStories(),
  ]);

  return (
    <HomeClient
      initialServices={services}
      initialDestinations={destinations}
      initialSuccessStories={stories}
    />
  );
}
