import { TaskStatus } from '@prisma/client';

export type StatusMenuItem = {
  value: TaskStatus;
  caption: string;
  plural: string;
};
export const taskStatus: StatusMenuItem[] = [
  {
    value: TaskStatus.REGISTERED,
    caption: 'Регистрирана',
    plural: 'Регистрирани',
  },
  {
    value: TaskStatus.OFFERED,
    caption: 'Предложена',
    plural: 'Предложени',
  },
  {
    value: TaskStatus.REJECTED,
    caption: 'Отказана',
    plural: 'Отказани',
  },
  {
    value: TaskStatus.ACCEPTED,
    caption: 'Приета',
    plural: 'Приети',
  },
  {
    value: TaskStatus.CLIENT_REJECTED,
    caption: 'Клиентът е отказал',
    plural: 'Клиентът е отказал',
  },
  {
    value: TaskStatus.STARTED,
    caption: 'Започната',
    plural: 'Започнати',
  },
  {
    value: TaskStatus.FINISHED,
    caption: 'Завършена',
    plural: 'Завършени',
  },
  {
    value: TaskStatus.UNABLE_TO_FINISH,
    caption: 'Партньорът не може да я завърши',
    plural: 'Партньорът не може да я завърши',
  },
  {
    value: TaskStatus.IMPOSSIBLE,
    caption: 'Задачата не може да се свърши',
    plural: 'Задачата не може да се свърши',
  },
];
