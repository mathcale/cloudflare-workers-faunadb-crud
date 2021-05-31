// @ts-ignore
import { ThrowableRouter, withContent, withParams, missing } from 'itty-router-extras';
import { TodoController } from './controllers';

const router = ThrowableRouter({ base: '/todos' });

router.get('/', TodoController.index);
router.get('/:id', withParams, TodoController.show);
router.post('/', withContent, TodoController.store);
router.patch('/:id', withParams, withContent, TodoController.update);
router.delete('/:id', withParams, TodoController.destroy);
router.all('*', () => missing({ message: 'Route not found' }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});
