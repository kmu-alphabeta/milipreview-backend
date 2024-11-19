import { setupServer } from 'msw/node';
import { authHandler } from './auth.handler';
import { historyHandler } from './history.handler';
import { meHandler } from './me.handler';
import { commonFormHandler } from './common-form.handler';

export const mockServer = setupServer(
  ...authHandler,
  ...commonFormHandler,
  ...historyHandler,
  ...meHandler,
);