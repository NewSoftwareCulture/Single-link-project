import { Options, Response } from './healthcheck.dto';

export const healthcheck = (options: Options): Response => {
  const { name, host, req } = options;
  return {
    name,
    host,
    res: {
      status: 'ok',
      code: 200,
    },
    req,
    time: Date.now(),
    date: new Date().toISOString(),
  };
};
