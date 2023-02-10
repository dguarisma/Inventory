export const SupplierExport = (data: any) =>
  data?.map((item: any) => ({
    ID: item?.ID || 0,
    EmailContact: item?.EmailContact?.toString(),
    Nit: item?.Nit?.toString(),
    BusinessName: item?.BusinessName,
    PhoneContact: item?.PhoneContact?.toString(),
    Status: Boolean(item?.Status),
    PaymenTerm: item?.PaymenTerm?.toString(),
    leadTimeBaq: Number(item?.LeadTimeBaq),
    LeadTimeBog: Number(item?.LeadTimeBog),
    Discount: Number(item?.Discount) || 0,
    DaysPayment: item?.DaysPayment?.toString(),
    Cupo: Number(item?.Cupo) || 0,
    NameContact: item?.NameContact?.toString()
  }));
