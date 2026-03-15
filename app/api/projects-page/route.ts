import { NextResponse } from "next/server";

import { getProjectsPage } from "@/sanity/lib/getProjectsPage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  try {
    const data = await getProjectsPage(locale);
    return NextResponse.json(data ?? null, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load projects page:", error);
    return NextResponse.json(null, {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
