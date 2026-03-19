import { client } from "./client";
import { donateQuickPageQuery } from "./queries";

export type DonateQuickPageData = {
  leftImage?: unknown;
  leftMessage?: string;
  amountTitle?: string;
  currencySymbol?: string;
  defaultAmount?: number;
  amountOptions?: number[];
  otherLabel?: string;
  confirmButtonLabel?: string;
  modalTitle?: string;
  totalLabel?: string;
  modalConfirmButtonLabel?: string;
  paymentMethods?: Array<{
    key?: string;
    label?: string;
    href?: string;
    detail?: string;
  }>;
};

export async function getDonateQuickPage(lang: string) {
  return client.fetch<DonateQuickPageData>(
    donateQuickPageQuery,
    { lang },
    { cache: "no-store" },
  );
}
