import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/components/PageHero";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type CampaignItem = {
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
  const fallback = t.raw("donate") as {
    campaigns: {
      currency: string;
      donateLabel: string;
      goalLabel: string;
      items: CampaignItem[];
    };
  };

  const campaignItems = fallback.campaigns.items;
  const campaign = campaignItems.find(
    (item) => slugify(item.title) === slug,
  );

  if (!campaign) {
    notFound();
  }

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: fallback.campaigns.currency || "USD",
    maximumFractionDigits: 0,
  });
  const percent = campaign.goalAmount
    ? Math.min(
        100,
        Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
      )
    : 0;

  const amountOptions = [5, 10, 20, 50, 100];
  const categories = [
    { label: "Donation Drive", count: 59 },
    { label: "Community Outreach", count: 35 },
    { label: "Volunteer Assistance", count: 12 },
    { label: "Fundraising Event", count: 46 },
    { label: "Support Network", count: 78 },
    { label: "Philanthropic Initiative", count: 89 },
  ];
  const galleryImages = [
    "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
    "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
  ];
  const detailParagraphs = [
    "Web designing in a powerful way of just not an only professions, however, in a passion for our Company. We have to a tendency to believe the idea that smart looking of any website is the first impression on visitors.",
    "Many people around the world don't have that luxury. Every day, about 1,400 children die from diseases caused by unsafe water and poor sanitation. But it doesn't have to be that way.",
    "We share transparent updates so you can see how each gift restores dignity and supports long-term recovery.",
  ];

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
                    backgroundColor: campaign.accentColor ?? "#F94B1C",
                  }}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-semibold text-secondary">
                <span className="flex items-center gap-2">
                  {percent}% Raised
                </span>
                <span>
                  {currencyFormatter.format(campaign.goalAmount)}{" "}
                  {fallback.campaigns.goalLabel}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {amountOptions.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-secondary hover:border-primary hover:text-primary"
                >
                  {amount}
                </button>
              ))}
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-secondary hover:border-primary hover:text-primary"
              >
                $ custom
              </button>
            </div>

            <div className="mt-10 rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-black text-secondary">
                Select Payment Method
              </h3>
              <div className="mt-4 flex flex-wrap gap-6 text-sm font-bold text-secondary">
                {["Test Donation", "Offline Donation", "Credit Card"].map(
                  (label) => (
                    <label key={label} className="flex items-center gap-2">
                      <input type="radio" name="payment" />
                      {label}
                    </label>
                  ),
                )}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-secondary">
                    First Name
                  </label>
                  <input
                    className="mt-2 w-full rounded-full bg-slate-50 px-4 py-3 text-sm"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-secondary">
                    Last Name
                  </label>
                  <input
                    className="mt-2 w-full rounded-full bg-slate-50 px-4 py-3 text-sm"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs font-bold text-secondary">
                  Email Address
                </label>
                <input
                  className="mt-2 w-full rounded-full bg-slate-50 px-4 py-3 text-sm"
                  placeholder="Email Address"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-secondary">
                    Donation Total
                  </label>
                  <input
                    className="mt-2 w-full rounded-full bg-slate-50 px-4 py-3 text-sm"
                    placeholder="$10"
                  />
                </div>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white"
                >
                  Donate Now
                </button>
              </div>
            </div>

            <div className="mt-10 space-y-6 text-sm text-slate-600 leading-relaxed">
              {detailParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {galleryImages.slice(0, 2).map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Gallery"
                  className="h-56 w-full rounded-3xl object-cover"
                />
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl bg-[#F1FAFB] p-6">
              <h3 className="text-lg font-black text-secondary">Categories</h3>
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
              <h3 className="text-lg font-black text-secondary">Gallery</h3>
              <div className="mt-4 space-y-4">
                {galleryImages.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Gallery"
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
