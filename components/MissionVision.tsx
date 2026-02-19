"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Rocket, Eye, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMissionVision } from "@/sanity/lib/getMissionVision";

const MissionVision = ({ locale }: { locale: string }) => {
  const t = useTranslations("MissionVision");
  const { data } = useQuery({
    queryKey: ["missionVision", locale],
    queryFn: () => getMissionVision(locale),
  });

  const objectivesItems = data?.objectives?.items?.length
    ? data.objectives.items
    : (t.raw("objectives.items") as string[]);
  const targetGroupItems = data?.targetGroups?.items?.length
    ? data.targetGroups.items
    : (t.raw("targetGroups.items") as string[]);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Section: Mission */}
        <div className="relative w-full lg:w-[32%] bg-primary flex flex-col items-center justify-center p-12 lg:p-16 text-center text-white z-10 overflow-hidden">
          {/* Background Image Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center grayscale opacity-50 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "url('hero-1.webp')",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center max-w-sm relative z-10"
          >
            <div className="mb-8 p-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
              <Rocket size={44} strokeWidth={1} />
            </div>
            <h3 className="font-cairo text-4xl font-black mb-6 tracking-tight uppercase">
              {data?.mission?.title ?? t("mission.title")}
            </h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-white/90">
              {data?.mission?.text ?? t("mission.text")}
            </p>
          </motion.div>

          {/* High-Frequency Jagged Edge (Right) */}
          <div
            className="absolute top-0 -right-[40px] h-full w-[80px] bg-primary z-20 hidden lg:block"
            style={{
              clipPath:
                "polygon(0 0, 50% 0, 48% 2%, 55% 4%, 45% 6%, 60% 8%, 48% 10%, 58% 12%, 45% 14%, 65% 16%, 48% 18%, 55% 20%, 45% 22%, 70% 24%, 48% 26%, 60% 28%, 45% 30%, 65% 32%, 48% 34%, 75% 36%, 45% 38%, 60% 40%, 48% 42%, 80% 44%, 45% 46%, 65% 48%, 48% 50%, 75% 52%, 45% 54%, 60% 56%, 48% 58%, 70% 60%, 45% 62%, 65% 64%, 48% 66%, 75% 68%, 45% 70%, 60% 72%, 48% 74%, 80% 76%, 45% 78%, 70% 80%, 48% 82%, 65% 84%, 45% 86%, 75% 88%, 48% 90%, 60% 92%, 45% 94%, 55% 96%, 48% 98%, 50% 100%, 0 100%)",
            }}
          />
        </div>

        {/* Middle Section: Objectives */}
        <div className="relative w-full lg:w-[36%] min-h-[600px] flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden z-20 font-nunito">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=1000')",
            }}
          />
          <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply" />

          <div className="relative z-30 flex flex-col items-center w-full max-w-md">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl relative group"
            >
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent translate-x-1" />
              <div className="absolute -inset-2 border-3 border-primary/40 rounded-full animate-ping" />
            </motion.div>

            <h2 className="text-white text-3xl font-[900] mb-8 uppercase tracking-[0.2em] text-center">
              Our{" "}
              <span className="text-primary">
                {data?.objectives?.highlight ?? t("objectives.highlight")}
              </span>
            </h2>

            {/* Objectives Numbered List */}
            <div className="text-left space-y-7 w-full px-2">
              {objectivesItems.map((text: string, i: number) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  key={i}
                  className="flex gap-6 group"
                >
                  <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 font-black text-sm group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                    {i + 1}
                  </div>
                  <p className="text-white/80 text-[14px] leading-relaxed font-semibold">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <button className="flex items-center gap-4 bg-primary text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all hover:bg-white hover:text-primary shadow-xl shadow-black/20">
                {data?.objectives?.donateNow ?? t("objectives.donateNow")}
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <ArrowRight size={14} strokeWidth={4} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Vision & Target Groups */}
        <div className="relative w-full lg:w-[32%] bg-primary flex flex-col items-center justify-center p-12 lg:p-16 text-center text-white z-10 overflow-hidden">
          {/* Background Image Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center grayscale opacity-10 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=1000')",
            }}
          />

          {/* High-Frequency Jagged Edge (Left) */}
          <div
            className="absolute top-0 -left-[40px] h-full w-[80px] bg-primary z-20 hidden lg:block"
            style={{
              clipPath:
                "polygon(100% 0, 50% 0, 52% 2%, 45% 4%, 55% 6%, 40% 8%, 52% 10%, 42% 12%, 55% 14%, 35% 16%, 52% 18%, 45% 20%, 55% 22%, 30% 24%, 52% 26%, 40% 28%, 55% 30%, 25% 32%, 52% 34%, 35% 36%, 55% 38%, 40% 40%, 52% 42%, 20% 44%, 55% 46%, 35% 48%, 52% 50%, 25% 52%, 55% 54%, 40% 56%, 52% 58%, 30% 60%, 55% 62%, 35% 64%, 52% 66%, 25% 68%, 55% 70%, 40% 72%, 52% 74%, 20% 76%, 55% 78%, 30% 80%, 52% 82%, 35% 84%, 55% 86%, 25% 88%, 52% 90%, 40% 92%, 55% 94%, 45% 96%, 52% 98%, 50% 100%, 100% 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center w-full relative z-10"
          >
            <div className="mb-6 p-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
              <Eye size={44} strokeWidth={1} />
            </div>
            <h3 className="font-cairo text-4xl font-black mb-6 tracking-tight uppercase">
              {data?.vision?.title ?? t("vision.title")}
            </h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-white/90 mb-10">
              {data?.vision?.text ?? t("vision.text")}
            </p>

            <div className="w-full h-px bg-white/20 mb-8" />

            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-white/30" />
                <h4 className="font-cairo text-xl font-bold uppercase tracking-widest">
                  {data?.targetGroups?.title ?? t("targetGroups.title")}
                </h4>
                <span className="w-8 h-[2px] bg-white/30" />
              </div>
              <ul className="text-left space-y-4 w-full">
                {targetGroupItems.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-start group">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 border-2 border-white group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-white/90 font-bold leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
