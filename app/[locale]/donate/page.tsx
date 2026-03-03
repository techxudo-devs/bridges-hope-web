import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/shared/PageHero";
import DonateCta from "@/components/sections/donate/DonateCta";
import DonationCard from "@/components/ui/DonationCard";
import { Link } from "@/navigation";
import { COLORS } from "@/lib/constants/colors";
import { getDonatePage } from "@/sanity/lib/getDonatePage";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const data = await getDonatePage(locale);
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
  const content = {
    badge: data?.badge ?? fallback.badge,
    title: data?.title ?? fallback.title,
    description: data?.description ?? fallback.description,
    primaryCta: data?.primaryCta ?? fallback.primaryCta,
    secondaryCta: data?.secondaryCta ?? fallback.secondaryCta,
    impact: {
      kicker: data?.impact?.kicker ?? fallback.impact.kicker,
      title: data?.impact?.title ?? fallback.impact.title,
      description: data?.impact?.description ?? fallback.impact.description,
      items: data?.impact?.items?.length ? data.impact.items : fallback.impact.items,
    },
    options: {
      kicker: data?.options?.kicker ?? fallback.options.kicker,
      title: data?.options?.title ?? fallback.options.title,
      description: data?.options?.description ?? fallback.options.description,
      items: data?.options?.items?.length
        ? data.options.items
        : fallback.options.items,
    },
    form: {
      kicker: data?.form?.kicker ?? fallback.form.kicker,
      title: data?.form?.title ?? fallback.form.title,
      description: data?.form?.description ?? fallback.form.description,
      mockLabel: data?.form?.mockLabel ?? fallback.form.mockLabel,
      amountLabel: data?.form?.amountLabel ?? fallback.form.amountLabel,
      amounts: data?.form?.amounts?.length ? data.form.amounts : fallback.form.amounts,
      customLabel: data?.form?.customLabel ?? fallback.form.customLabel,
      summaryLabel: data?.form?.summaryLabel ?? fallback.form.summaryLabel,
      summary: {
        amount: data?.form?.summary?.amount ?? fallback.form.summary.amount,
        frequency: data?.form?.summary?.frequency ?? fallback.form.summary.frequency,
        once: data?.form?.summary?.once ?? fallback.form.summary.once,
      },
      submit: data?.form?.submit ?? fallback.form.submit,
      note: data?.form?.note ?? fallback.form.note,
    },
    promise: {
      kicker: data?.promise?.kicker ?? fallback.promise.kicker,
      title: data?.promise?.title ?? fallback.promise.title,
      description: data?.promise?.description ?? fallback.promise.description,
      items: data?.promise?.items?.length ? data.promise.items : fallback.promise.items,
    },
    campaigns: {
      kicker: data?.campaigns?.kicker ?? fallback.campaigns.kicker,
      title: data?.campaigns?.title ?? fallback.campaigns.title,
      description: data?.campaigns?.description ?? fallback.campaigns.description,
      donateLabel: data?.campaigns?.donateLabel ?? fallback.campaigns.donateLabel,
      goalLabel: data?.campaigns?.goalLabel ?? fallback.campaigns.goalLabel,
      currency: data?.campaigns?.currency ?? fallback.campaigns.currency,
      items: data?.campaigns?.items?.length
        ? data.campaigns.items
        : fallback.campaigns.items,
    },
    cta: {
      title: data?.cta?.title ?? fallback.cta.title,
      description: data?.cta?.description ?? fallback.cta.description,
      buttonLabel: data?.cta?.buttonLabel ?? fallback.cta.buttonLabel,
      splashImage: data?.cta?.splashImage ?? fallback.cta.splashImage,
      photoImage: data?.cta?.photoImage ?? fallback.cta.photoImage,
    },
  };
  const campaignItems = content.campaigns.items;
  const campaignColors = [COLORS.primary, COLORS.orange, COLORS.green];
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
