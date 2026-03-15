import { NextResponse } from "next/server";

import { getDonatePage } from "@/sanity/lib/getDonatePage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  try {
    const data = await getDonatePage(locale);
    return NextResponse.json(data ?? null, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load donate page:", error);
    return NextResponse.json(null, {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
