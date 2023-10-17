import { CreditMovementReason } from '@prisma/client';

type ReasonItem = {
  value: CreditMovementReason;
  caption: string;
  partnerCaption: string;
};
export const creditMovementReasonValues: ReasonItem[] = [
  {
    value: CreditMovementReason.ADMIN_CORRECT_ERROR,
    caption: 'Корекция на грешка',
    partnerCaption: 'Корекция на грешка',
  },
  {
    value: CreditMovementReason.ADMIN_REFUND_TASK,
    caption: 'Връщане на плащане',
    partnerCaption: 'Връщане на плащане',
  },
  {
    value: CreditMovementReason.PARTNER_INPUT,
    caption: 'Партньор внася по сметка',
    partnerCaption: 'Вноска по сметка',
  },
  {
    value: CreditMovementReason.PARTNER_SPEND_ON_TASK,
    caption: 'Партньор плаща от сметката си',
    partnerCaption: 'Плащане',
  },
  {
    value: CreditMovementReason.PARTNER_WITHDRAW,
    caption: 'Партньор си иска парите',
    partnerCaption: 'Изтегляне на средства',
  },
];
