type CampaignItem = {
  slug?: string;
  category?: string;
  title?: string;
  description?: string;
  image?: any;
  raisedAmount?: number;
  goalAmount?: number;
  accentColor?: string;
};

type DonatePageData = {
  campaigns?: {
    kicker?: string;
    title?: string;
    description?: string;
    donateLabel?: string;
    goalLabel?: string;
    currency?: string;
    items?: CampaignItem[];
  };
  cta?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    splashImage?: any;
    photoImage?: any;
  };
};

export async function fetchCampaigns(locale: string): Promise<CampaignItem[]> {
  const response = await fetch(`/api/campaigns?locale=${locale}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.json();
}

export async function fetchDonatePage(locale: string): Promise<DonatePageData | null> {
  const response = await fetch(`/api/donate-page?locale=${locale}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch donate page");
  }

  return response.json();
}
