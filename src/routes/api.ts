import { Hono } from 'hono';
import { reddit } from '@devvit/web/server';

export const api = new Hono();

api.get('/reddit-posts', async (c) => {
  try {
    const posts = await reddit.getNewPosts({
      subredditName: 'AskReddit',
      limit: 5,
    }).all();

    return c.json({
      success: true,
      count: posts.length,
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        author: post.authorName,
        createdAt: post.createdAt,
        score: post.score,
      })),
    });
  } catch (error) {
    console.error('Reddit API error:', error);

    return c.json(
      {
        success: false,
        error: String(error),
      },
      500
    );
  }
});