import { Hono } from 'hono';
import type { TaskRequest, TaskResponse } from '@devvit/web/server';
import {
  runWeeklyMegathreadCheck,
  testRedditRead,
} from '../features/scheduler-megathread/handlers.js';

// Router for scheduled task endpoints declared in devvit.json/scheduler.tasks.
export const schedulerRoutes = new Hono();

schedulerRoutes.post('/weekly-megathread-check', async (c) => {
  // Parse scheduler payload (task name and optional data).
  const input = await c.req.json<TaskRequest>();
  console.log('Running scheduled task:', input.name);

  // Test Reddit API read access.
  await testRedditRead();

  // Scheduler endpoint response is currently empty object.
  return c.json<TaskResponse>({}, 200);
});