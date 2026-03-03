import { getTranslations } from "next-intl/server";

import DonationCard from "@/components/ui/DonationCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Link } from "@/navigation";
import { getDonatePage } from "@/sanity/lib/getDonatePage";

type DonationPreviewSectionProps = {
  locale: string;
};

const DonationPreviewSection = async ({
  locale,
}: DonationPreviewSectionProps) => {
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const data = await getDonatePage(locale);
  const donateContent = tPages.raw("donate") as {
    campaigns: {
      kicker?: string;
      title?: string;
      description?: string;
      viewAllLabel?: string;
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
  };

  const campaigns = {
    kicker: data?.campaigns?.kicker ?? donateContent.campaigns.kicker,
    title: data?.campaigns?.title ?? donateContent.campaigns.title,
    description:
      data?.campaigns?.description ?? donateContent.campaigns.description,
    donateLabel:
      data?.campaigns?.donateLabel ?? donateContent.campaigns.donateLabel,
    goalLabel: data?.campaigns?.goalLabel ?? donateContent.campaigns.goalLabel,
    currency: data?.campaigns?.currency ?? donateContent.campaigns.currency,
    items: data?.campaigns?.items?.length
      ? data.campaigns.items
      : donateContent.campaigns.items,
  };

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: campaigns.currency || "USD",
    maximumFractionDigits: 0,
  });
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  const donatePreviewItems = campaigns.items.slice(0, 3);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 ">
        <SectionHeading
          subtitle={campaigns.kicker ?? ""}
          title={campaigns.title ?? ""}
          centered
        />
        {campaigns.description ? (
          <p className="-mt-10 text-center text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            {campaigns.description}
          </p>
        ) : null}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {donatePreviewItems.map((item, index) => {
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
                  accentColor={item.accentColor}
                  donateLabel={campaigns.donateLabel}
                  goalLabel={campaigns.goalLabel}
                  formatAmount={(value) => currencyFormatter.format(value)}
                />
              </Link>
            );
          })}
        </div>
        {donateContent.campaigns.viewAllLabel ? (
          <div className="mt-10 flex justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-white px-8 py-3 text-sm font-bold text-secondary transition-all hover:border-primary hover:text-primary"
            >
              {donateContent.campaigns.viewAllLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DonationPreviewSection;
