export const LinkTargets = ['SHOPEE', 'TOKOPEDIA', 'WHATSAPP'] as const;
export type LinkTarget = (typeof LinkTargets)[number];
