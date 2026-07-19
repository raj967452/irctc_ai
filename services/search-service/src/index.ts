import express from 'express';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import Redis from 'ioredis';

const app = express();
const esClient = new ElasticsearchClient({ node: process.env.ELASTICSEARCH_URL ?? 'http://es-cluster:9200' });
const redis = new Redis.Cluster([{ host: process.env.REDIS_HOST ?? 'redis-cluster', port: Number(process.env.REDIS_PORT ?? 6379) }]);

app.get('/api/v1/search', async (req, res) => {
  const { from, to, date, class: travelClass } = req.query;
  const cacheKey = `search:${from}:${to}:${date}:${travelClass}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const result = await esClient.search({
    index: 'trains',
    body: {
      query: {
        bool: {
          must: [
            { term: { from_station_code: from } },
            { term: { to_station_code: to } },
            { term: { run_date: date } }
          ]
        }
      },
      aggs: {
        availability: {
          nested: { path: 'classes' },
          aggs: {
            classes: {
              terms: { field: 'classes.class_type' }
            }
          }
        }
      }
    }
  });

  await redis.setex(cacheKey, 300, JSON.stringify(result));
  return res.json(result);
});

app.get('/api/v1/trains', async (_req, res) => {
  const cached = await redis.get('trains:popular');
  if (cached) return res.json(JSON.parse(cached));
  const result = await esClient.search({ index: 'trains', size: 50, body: { query: { match_all: {} } } });
  await redis.setex('trains:popular', 300, JSON.stringify(result));
  return res.json(result);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: Date.now(), service: 'search-service' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Search service running on port ${PORT}`);
});
