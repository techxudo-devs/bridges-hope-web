type CampaignItem = {
  slug?: string;
  category?: string;
  title?: string;
  description?: string;
  image?: unknown;
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
    splashImage?: unknown;
    photoImage?: unknown;
  };
};

type DonateQuickPageData = {
  leftImage?: unknown;
  leftMessage?: string;
  amountTitle?: string;
  currencySymbol?: string;
  defaultAmount?: number;
  amountOptions?: number[];
  otherLabel?: string;
  confirmButtonLabel?: string;
  modalTitle?: string;
  totalLabel?: string;
  modalConfirmButtonLabel?: string;
  paymentMethods?: Array<{
    key?: string;
    label?: string;
    href?: string;
    detail?: string;
  }>;
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

export async function fetchDonateQuickPage(
  locale: string,
): Promise<DonateQuickPageData | null> {
  const response = await fetch(`/api/donate-quick-page?locale=${locale}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch donate quick page");
  }

  return response.json();
}
