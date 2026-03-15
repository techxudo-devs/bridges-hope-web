import { NextResponse } from "next/server";

import { getDonationPosts } from "@/sanity/lib/getDonationPosts";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  try {
    const items = await getDonationPosts(locale);
    return NextResponse.json(items ?? [], {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load campaigns:", error);
    return NextResponse.json([], {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
