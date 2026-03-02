import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import PageHero from "@/components/shared/PageHero";
import ContactSection from "@/components/sections/homepage/ContactSection";
import DonateCta from "@/components/sections/donate/DonateCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const ContactPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const tFooter = await getTranslations({ locale, namespace: "Footer" });
  const contactContent = tPages.raw("contactPage") as {
    title: string;
    kicker: string;
    description: string;
    mapAlt: string;
    cards: {
      address: string;
      email: string;
      phone: string;
    };
  };
  const donateFallback = tPages.raw("donate") as {
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      splashImage?: any;
      photoImage?: any;
    };
  };

  const contactCards = [
    {
      icon: MapPin,
      label: contactContent.cards.address,
      value: tFooter("address"),
    },
    {
      icon: Mail,
      label: contactContent.cards.email,
      value: tFooter("email"),
    },
    {
      icon: Phone,
      label: contactContent.cards.phone,
      value: tFooter("phone"),
    },
  ];

  return (
    <div>
      <PageHero title={contactContent.title} homeLabel={nav("home")} />

      <ContactSection locale={locale} />
      {/* <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-start">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 shadow-lg">
            <Image
              src="/contact-map.png"
              alt={contactContent.mapAlt}
              width={1513}
              height={597}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {contactContent.kicker}
              </p>
              <h2 className="text-3xl font-black text-slate-900">
                {contactContent.title}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {contactContent.description}
              </p>
            </div>

            <div className="grid gap-5">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-6 shadow-sm"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {card.label}
                      </p>
                      <p className="text-sm text-slate-500">{card.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}
      {/* <DonateCta content={donateFallback.cta} isRtl={locale === "ar"} /> */}
    </div>
  );
};

export default ContactPage;
