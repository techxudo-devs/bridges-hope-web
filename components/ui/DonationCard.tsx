import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";

type DonationCardProps = {
  image: any;
  category: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  percentage: number;
  accentColor?: string;
  donateLabel?: string;
  goalLabel?: string;
  formatAmount?: (value: number) => string;
};

const DonationCard = ({
  image,
  category,
  title,
  description,
  raised,
  goal,
  percentage,
  accentColor = "#FF5722",
  donateLabel = "Donate",
  goalLabel = "Goal",
  formatAmount,
}: DonationCardProps) => {
  const getImageUrl = (img: any) => {
    if (!img) return "/placeholder.jpg";
    if (typeof img === "string") return img;
    return urlFor(img).width(600).quality(90).url();
  };
  const formatValue = (value: number) =>
    formatAmount ? formatAmount(value) : `$${value.toLocaleString()}`;

  return (
    <div className="group relative w-full max-w-[440px]">
      <div className="relative rounded-3xl overflow-hidden bg-[#F1FAFB] shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-44 overflow-">
          <img
            src={getImageUrl(image)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 "
          />

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            style={{ backgroundColor: accentColor }}
          />

          {/* Category Badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div
              className="px-6 py-2 rounded-full text-white text-sm font-bold shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              {category}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8">
          <h3 className="text-xl md:text-2xl font-black text-[#1A202C] leading-tight mb-3">
            {title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="relative h-2 bg-[#FFE0D6] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: accentColor,
                }}
              />
            </div>

            {/* Percentage Label */}
            <div className="flex justify-end mt-2">
              <span
                className="inline-block px-3 py-1 text-white text-xs font-bold rounded"
                style={{ backgroundColor: accentColor }}
              >
                {percentage}%
              </span>
            </div>
          </div>

          {/* Donation Stats */}
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-1 rtl:flex-row-reverse">
              <span className="text-lg md:text-xl font-black text-[#1A202C]">
                {formatValue(raised)}
              </span>
              <span className="text-sm text-slate-600">{donateLabel}</span>
            </div>
            <div className="flex items-baseline gap-1 text-right rtl:flex-row-reverse">
              <span className="text-lg md:text-xl font-black text-[#1A202C]">
                {formatValue(goal)}
              </span>
              <span className="text-sm text-slate-600">{goalLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Arrow Button - Outside Card */}
      <div className="flex justify-center -mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
