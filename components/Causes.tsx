"use client";

import { useTranslations } from "next-intl";

export default function Causes() {
  const t = useTranslations("Causes");
  const causesData = t.raw("items");

  const causes = [
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
      title: causesData[0].title,
      description: causesData[0].description,
      raised: 20000,
      goal: 30000,
      category: causesData[0].category,
    },
    {
      image:
        "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1000",
      title: causesData[1].title,
      description: causesData[1].description,
      raised: 55000,
      goal: 65000,
      category: causesData[1].category,
    },
    {
      image:
        "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1000",
      title: causesData[2].title,
      description: causesData[2].description,
      raised: 45000,
      goal: 50000,
      category: causesData[2].category,
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          subtitle={t("subtitle")}
          title={t("title")}
          highlight={t("highlight")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {causes.map((cause, idx) => {
            const percentage = Math.round((cause.raised / cause.goal) * 100);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                {/* Image Box */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-primary text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {cause.category}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-8 lg:p-10">
                  <h3 className="text-secondary text-2xl font-black font-nunito mb-4 hover:text-primary transition-colors line-clamp-1">
                    <Link href="#">{cause.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-[15px] mb-8 line-clamp-2 font-medium leading-relaxed">
                    {cause.description}
                  </p>

                  {/* Progress Container */}
                  <div className="mb-8">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                          {t("raisedLabel")}
                        </span>
                        <span className="text-secondary font-black font-nunito text-lg">
                          ${cause.raised.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-primary font-black font-nunito text-lg">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    {/* Progress Bar Body */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-full rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-[-20deg] animate-[shimmer_2s_infinite]"></div>
                      </motion.div>
                    </div>
                    <div className="mt-3 flex justify-between text-[11px] font-black uppercase tracking-tighter text-slate-400">
                      <span>
                        {t("goalLabel")}: ${cause.goal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-between bg-secondary group-hover:bg-primary text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all duration-300">
                    {t("donateNow")}
                    <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }
      `}</style>
    </section>
  );
}
