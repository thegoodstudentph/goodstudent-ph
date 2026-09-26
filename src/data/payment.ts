// Edit these to your real GCash / Maya details.
export const PAYMENT_METHODS = [
  {
    id: "gcash",
    label: "GCash",
    accountName: "Juan Dela Cruz",
    accountNumber: "0917-000-0000",
    color: "#007aff",
  },
  {
    id: "maya",
    label: "Maya",
    accountName: "Juan Dela Cruz",
    accountNumber: "0918-000-0000",
    color: "#7a9e87",
  },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];
