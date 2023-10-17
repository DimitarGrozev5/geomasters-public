import { TaskBasicCategory } from '@prisma/client';

type CategoryMenuItem = {
  value: TaskBasicCategory;
  caption: string;
};
export const taskBasicCategoryValues: CategoryMenuItem[] = [
  { value: TaskBasicCategory.TRASIRANE, caption: 'Трасиране' },
  { value: TaskBasicCategory.ZASNEMANE, caption: 'Заснемане' },
  {
    value: TaskBasicCategory.TARPIMOST,
    caption: 'Търпимост/Озаконяване на сграда',
  },
  { value: TaskBasicCategory.IZMENENIE_KKKR, caption: 'Изменение КККР' },
  { value: TaskBasicCategory.POPALVANE_STROEJ, caption: 'Попълване строеж' },
  { value: TaskBasicCategory.DELBA_OBEDINENIE, caption: 'Делба/Обединение' },
  { value: TaskBasicCategory.KKKR_DRUGI, caption: 'Задача за КККР' },
  {
    value: TaskBasicCategory.VP,
    caption: 'Вертикална планировка, Трасировъчен план',
  },
  {
    value: TaskBasicCategory.STROITELNA_LINIA,
    caption: 'Откриване на строителна линия',
  },
  { value: TaskBasicCategory.STROITELSTVO, caption: 'Строителни задачи' },
  { value: TaskBasicCategory.PUP, caption: 'Изготвяне на ПУП' },
  { value: TaskBasicCategory.INJENERSTVO, caption: 'Инженерна задача' },
  { value: TaskBasicCategory.OCENKA_SO, caption: 'Оценка на СО' },
  { value: TaskBasicCategory.OCENKA_PI, caption: 'Оценка на ПИ/УПИ' },
  { value: TaskBasicCategory.UNSET, caption: 'Непосочена' },
  { value: TaskBasicCategory.UNKNOWN, caption: 'Неизвестна' },
];
