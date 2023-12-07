import { Prisma, PrismaClient } from '@prisma/client';

const isDev = process.env.NODE_ENV === 'development';

const transform = (prisma: PrismaClient) =>
  prisma.$extends({
    model: {
      $allModels: {
        createSelect<
          T,
          const A extends Prisma.Args<T, 'findUniqueOrThrow'>['select'],
        >(this: T, args: A): A {
          return args;
        },
      },
    },
  });

export type DbClient = ReturnType<typeof transform>;

declare global {
  // eslint-disable-next-line no-var
  var prisma: DbClient | undefined;
}

const log: Prisma.LogDefinition[] = [
  {
    emit: 'stdout',
    level: 'warn',
  },
  {
    emit: 'stdout',
    level: 'error',
  },
];

if (isDev) {
  log.push(
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'info',
    }
  );
}

const rawClient = new PrismaClient({
  log,
});

export const db = global.prisma ?? transform(rawClient);

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}
