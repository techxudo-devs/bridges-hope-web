import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/shared/PageHero";
import DonateCta from "@/components/sections/donate/DonateCta";
import DonationCard from "@/components/ui/DonationCard";
import { Link } from "@/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const fallback = t.raw("donate") as {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    impact: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{ title: string; description: string }>;
    };
    options: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{ title: string; description: string; detail: string }>;
    };
    form: {
      kicker: string;
      title: string;
      description: string;
      mockLabel: string;
      amountLabel: string;
      amounts: string[];
      customLabel: string;
      summaryLabel: string;
      summary: { amount: string; frequency: string; once: string };
      submit: string;
      note: string;
    };
    promise: {
      kicker: string;
      title: string;
      description: string;
      items: string[];
    };
    campaigns: {
      kicker?: string;
      title?: string;
      description?: string;
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
  const content = fallback;
  const campaignItems = content.campaigns.items;
  const campaignColors = ["#F94B1C", "#F5B100", "#28D08F"];
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: content.campaigns.currency || "USD",
    maximumFractionDigits: 0,
  });

  return (
    <main className="bg-white">
      <PageHero title={content.title} homeLabel={nav("home")} />

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
    </main>
  );
};

export default DonatePage;
