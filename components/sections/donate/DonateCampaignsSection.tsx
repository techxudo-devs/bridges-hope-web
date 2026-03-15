"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import DonateCta from "@/components/sections/donate/DonateCta";
import DonationCard from "@/components/ui/DonationCard";
import { COLORS } from "@/lib/constants/colors";
import { Link } from "@/navigation";
import { fetchCampaigns, fetchDonatePage } from "@/lib/api/campaigns";

type DonateCampaignsSectionProps = {
  locale: string;
};

const DonateCampaignsSection = ({ locale }: DonateCampaignsSectionProps) => {
  const t = useTranslations("Pages");

  const { data: donatePageData } = useQuery({
    queryKey: ["donatePage", locale],
    queryFn: () => fetchDonatePage(locale),
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    retry: 1,
  });

  const { data: donationPosts } = useQuery({
    queryKey: ["donationPosts", locale],
    queryFn: () => fetchCampaigns(locale),
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    retry: 1,
  });

  const fallback = t.raw("donate") as {
    campaigns: {
      donateLabel: string;
      goalLabel: string;
      currency: string;
      items: Array<{
        slug?: string;
        category: string;
        title: string;
        description: string;
        image?: any;
        raisedAmount: number;
        goalAmount: number;
        accentColor?: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      splashImage?: any;
      photoImage?: any;
    };
  };

  const content = useMemo(
    () => ({
      campaigns: {
        donateLabel:
          donatePageData?.campaigns?.donateLabel ??
          fallback.campaigns.donateLabel,
        goalLabel:
          donatePageData?.campaigns?.goalLabel ?? fallback.campaigns.goalLabel,
        currency:
          donatePageData?.campaigns?.currency ?? fallback.campaigns.currency,
        items: fallback.campaigns.items,
      },
      cta: {
        title: donatePageData?.cta?.title ?? fallback.cta.title,
        description: donatePageData?.cta?.description ?? fallback.cta.description,
        buttonLabel: donatePageData?.cta?.buttonLabel ?? fallback.cta.buttonLabel,
        splashImage: donatePageData?.cta?.splashImage ?? fallback.cta.splashImage,
        photoImage: donatePageData?.cta?.photoImage ?? fallback.cta.photoImage,
      },
    }),
    [donatePageData, fallback],
  );

  const campaignItems = donationPosts?.length
    ? donationPosts.map((post) => ({
        slug: post.slug,
        category: post.category ?? "",
        title: post.title ?? "",
        description: post.description ?? "",
        image: post.image,
        raisedAmount: post.raisedAmount ?? 0,
        goalAmount: post.goalAmount ?? 0,
        accentColor: post.accentColor,
      }))
    : [];

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: content.campaigns.currency || "USD",
    maximumFractionDigits: 0,
  });

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const campaignColors = [COLORS.primary, COLORS.orange, COLORS.green];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {campaignItems.map((item, index) => {
              const accent =
                item.accentColor ??
                campaignColors[index % campaignColors.length];
              const percent = item.goalAmount
                ? Math.min(
                    100,
                    Math.round((item.raisedAmount / item.goalAmount) * 100),
                  )
                : 0;
              const slug = item.slug ?? slugify(item.title) ?? `${index + 1}`;

              return (
                <Link
                  key={`${item.title}-${index}`}
                  href={`/donate/${slug}`}
                  className="block"
                >
                  <DonationCard
                    image={item.image}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    raised={item.raisedAmount}
                    goal={item.goalAmount}
                    percentage={percent}
                    accentColor={accent}
                    donateLabel={content.campaigns.donateLabel}
                    goalLabel={content.campaigns.goalLabel}
                    formatAmount={(value) => currencyFormatter.format(value)}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <DonateCta content={content.cta} isRtl={locale === "ar"} />
    </>
  );
};

export default DonateCampaignsSection;
