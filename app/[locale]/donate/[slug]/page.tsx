import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getDonationPostBySlug } from "@/sanity/lib/getDonationPost";
import { getDonationPosts } from "@/sanity/lib/getDonationPosts";
import { urlFor } from "@/sanity/lib/image";
import { getDonateDetail } from "@/sanity/lib/getDonateDetail";
import { getDonatePage } from "@/sanity/lib/getDonatePage";
import DonateQuickInline from "@/components/sections/donate/DonateQuickInline";
import PageHero from "@/components/shared/PageHero";
import { COLORS } from "@/lib/constants/colors";
import RichText from "@/components/ui/RichText";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type CampaignItem = {
  slug?: string;
  category: string;
  title: string;
  description: string;
  image?: any;
  raisedAmount: number;
  goalAmount: number;
  accentColor?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const getImageUrl = (image: any, fallback: string, width = 1200) => {
  if (!image) return fallback;
  if (typeof image === "string") return image;
  return urlFor(image).width(width).quality(90).url();
};

const DonateDetailPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const donateData = await getDonatePage(locale);
  const donateDetailData = await getDonateDetail(locale);
  const donationPost = await getDonationPostBySlug(locale, slug);
  const donationPosts = await getDonationPosts(locale);
  const fallback = t.raw("donate") as {
    campaigns: {
      currency: string;
      donateLabel: string;
      goalLabel: string;
      items: CampaignItem[];
    };
  };
  const detailFallback = t.raw("donateDetail") as {
    raisedLabel: string;
    selectPaymentTitle: string;
    paymentMethods: string[];
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    donationTotalLabel: string;
    donateNowLabel: string;
    amountOptions: number[];
    customAmountLabel: string;
    categoriesTitle: string;
    categories: Array<{ label: string; count: number }>;
    galleryTitle: string;
    detailParagraphs: string[];
  };

  const campaigns = {
    currency: donateData?.campaigns?.currency ?? fallback.campaigns.currency,
    donateLabel: donateData?.campaigns?.donateLabel ?? fallback.campaigns.donateLabel,
    goalLabel: donateData?.campaigns?.goalLabel ?? fallback.campaigns.goalLabel,
    items: donationPosts?.length
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
      : donateData?.campaigns?.items?.length
        ? donateData.campaigns.items
        : fallback.campaigns.items,
  };
  const detail = {
    raisedLabel: donateDetailData?.raisedLabel ?? detailFallback.raisedLabel,
    selectPaymentTitle:
      donateDetailData?.selectPaymentTitle ?? detailFallback.selectPaymentTitle,
    paymentMethods: donateDetailData?.paymentMethods?.length
      ? donateDetailData.paymentMethods
      : detailFallback.paymentMethods,
    firstNameLabel:
      donateDetailData?.firstNameLabel ?? detailFallback.firstNameLabel,
    lastNameLabel:
      donateDetailData?.lastNameLabel ?? detailFallback.lastNameLabel,
    emailLabel: donateDetailData?.emailLabel ?? detailFallback.emailLabel,
    donationTotalLabel:
      donateDetailData?.donationTotalLabel ?? detailFallback.donationTotalLabel,
    donateNowLabel:
      donateDetailData?.donateNowLabel ?? detailFallback.donateNowLabel,
    amountOptions: donateDetailData?.amountOptions?.length
      ? donateDetailData.amountOptions
      : detailFallback.amountOptions,
    customAmountLabel:
      donateDetailData?.customAmountLabel ?? detailFallback.customAmountLabel,
    categoriesTitle:
      donateDetailData?.categoriesTitle ?? detailFallback.categoriesTitle,
    categories: donationPost?.categories?.length
      ? donationPost.categories
      : donateDetailData?.categories?.length
        ? donateDetailData.categories
        : detailFallback.categories,
    galleryTitle: donateDetailData?.galleryTitle ?? detailFallback.galleryTitle,
    detailParagraphs: donationPost?.detailParagraphs?.length
      ? donationPost.detailParagraphs
      : donateDetailData?.detailParagraphs?.length
        ? donateDetailData.detailParagraphs
        : detailFallback.detailParagraphs,
    galleryImages: donationPost?.galleryImages ?? donateDetailData?.galleryImages ?? [],
  };

  const campaignItems = campaigns.items;
  const campaign = donationPost?.slug
    ? {
        slug: donationPost.slug,
        category: donationPost.category ?? "",
        title: donationPost.title ?? "",
        description: donationPost.description ?? "",
        image: donationPost.image,
        raisedAmount: donationPost.raisedAmount ?? 0,
        goalAmount: donationPost.goalAmount ?? 0,
        accentColor: donationPost.accentColor,
      }
    : campaignItems.find((item) => (item.slug ?? slugify(item.title)) === slug);

  if (!campaign) {
    notFound();
  }

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: campaigns.currency || "USD",
    maximumFractionDigits: 0,
  });
  const percent = campaign.goalAmount
    ? Math.min(
        100,
        Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
      )
    : 0;

  const galleryFallback = [
    "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
    "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
  ];
  const galleryImages = detail.galleryImages.length
    ? detail.galleryImages.map((image: any, index: number) =>
        getImageUrl(image, galleryFallback[index % galleryFallback.length]),
      )
    : galleryFallback;
  const categories = detail.categories;
  const detailParagraphs = detail.detailParagraphs;

  return (
    <main className="bg-white">
      <PageHero title={campaign.title} homeLabel={nav("home")} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <img
                src={getImageUrl(
                  campaign.image,
                  "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1600",
                )}
                alt={campaign.title}
                className="h-[320px] w-full object-cover"
              />
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-primary">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              {campaign.category}
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-black text-secondary">
              {campaign.title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
              {campaign.description}
            </p>

            <div className="mt-6">
              <div className="relative h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: campaign.accentColor ?? COLORS.primary,
                  }}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-semibold text-secondary">
                <span className="flex items-center gap-2">
                  {percent}% {detail.raisedLabel}
                </span>
                <span>
                  {currencyFormatter.format(campaign.goalAmount)}{" "}
                  {campaigns.goalLabel}
                </span>
              </div>
            </div>

            <DonateQuickInline
              locale={locale}
              overrideDefaultAmount={donationPost?.defaultAmount}
              overrideAmountOptions={donationPost?.amountOptions}
            />

            {donationPost?.richContent?.length ? (
              <RichText blocks={donationPost.richContent} className="mt-10" />
            ) : (
              <div className="mt-10 space-y-6 text-sm text-slate-600 leading-relaxed">
                {detailParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}

            {donationPost?.youtubeUrl ? (
              <div className="mt-8 overflow-hidden rounded-2xl aspect-video">
                <iframe
                  src={donationPost.youtubeUrl.replace("watch?v=", "embed/")}
                  title="Campaign Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : null}

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {galleryImages.slice(0, 2).map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={detail.galleryTitle}
                  className="h-56 w-full rounded-3xl object-cover"
                />
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl bg-[#F1FAFB] p-6">
              <h3 className="text-lg font-black text-secondary">
                {detail.categoriesTitle}
              </h3>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                {categories.map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span>{item.label}</span>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#F1FAFB] p-6">
              <h3 className="text-lg font-black text-secondary">
                {detail.galleryTitle}
              </h3>
              <div className="mt-4 space-y-4">
                {galleryImages.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={detail.galleryTitle}
                    className="h-20 w-full rounded-2xl object-cover"
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default DonateDetailPage;
