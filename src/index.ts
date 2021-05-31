// @ts-ignore
import { ThrowableRouter, withContent, withParams, status, missing } from 'itty-router-extras';
import faunadb from 'faunadb';

import { customFetch, getFaunaError } from './utils/customFetch';
import type { Todo, CreateTodoRequest, EditTodoRequest } from './types';

const router = ThrowableRouter({ base: '/todos' });

const faunaClient = new faunadb.Client({
  // @ts-ignore
  secret: FAUNADB_SECRET,
  // @ts-ignore
  fetch: customFetch,
});

const { Create, Collection, Get, Ref, Paginate, Let, Var, Update, Map, Documents, Lambda, Delete } =
  faunadb.query;

router.get('/', async () => {
  try {
    const response: { data: any[] } = await faunaClient.query(
      Map(
        Paginate(Documents(Collection('todos')), { size: 10 }),
        Lambda((x) => Get(x)),
      ),
    );

    const todos: Todo[] = response.data.map((data) => ({
      id: data.ref.id,
      ...data.data,
    }));

    return status(200, {
      todos,
    });
  } catch (error) {
    const faunaError = getFaunaError(error);
    return error(faunaError.status, faunaError.description);
  }
});

router.get('/:id', withParams, async (req: { id: string }) => {
  try {
    const result = await faunaClient.query(Get(Ref(Collection('todos'), req.id)));

    return status(200, {
      // @ts-ignore
      id: result.ref.id,
      // @ts-ignore
      ...result.data,
    });
  } catch (error) {
    const faunaError = getFaunaError(error);
    return error(faunaError.status, faunaError.description);
  }
});

router.post('/', withContent, async (req: { content: CreateTodoRequest }) => {
  const data = {
    description: req.content.description,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: '',
  };

  const result = await faunaClient.query(
    Create(Collection('todos'), {
      data,
    }),
  );

  return status(201, {
    // @ts-ignore
    id: result.ref.id,
    ...data,
  });
});

router.patch(
  '/:id',
  withParams,
  withContent,
  async (req: { id: string; content: EditTodoRequest }) => {
    const { completed } = req.content;

    try {
      const result = await faunaClient.query(
        Let(
          {
            todoRef: Ref(Collection('todos'), req.id),
          },
          Update(Var('todoRef'), {
            data: {
              completed: completed,
              completedAt: completed ? new Date().toISOString() : '',
            },
          }),
        ),
      );

      return status(200, {
        // @ts-ignore
        id: result.ref.id,
        // @ts-ignore
        ...result.data,
      });
    } catch (error) {
      const faunaError = getFaunaError(error);
      return error(faunaError.status, faunaError.description);
    }
  },
);

router.delete('/:id', withParams, async (req: { id: string }) => {
  try {
    await faunaClient.query(Delete(Ref(Collection('todos'), req.id)));
    return status(200);
  } catch (error) {
    const faunaError = getFaunaError(error);
    return error(faunaError.status, faunaError.description);
  }
});

router.all('*', () => missing({ message: 'Route not found' }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});
