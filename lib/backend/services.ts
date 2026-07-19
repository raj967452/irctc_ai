export type BackendService = {
  name: string;
  responsibilities: string[];
  storage: string[];
  protocols: string[];
  scaleStrategy: string;
};

export const backendServices: BackendService[] = [
  {
    name: 'Auth Service',
    responsibilities: ['JWT issuance', 'OAuth2 federation', 'MFA challenge orchestration', 'session risk scoring'],
    storage: ['Redis session cache', 'LDAP / identity provider'],
    protocols: ['REST', 'OIDC'],
    scaleStrategy: 'Stateless pods behind the API Gateway with Redis-backed token revocation.'
  },
  {
    name: 'Search Service',
    responsibilities: ['station search', 'train discovery', 'geo-aware route lookup', 'fare-class indexing'],
    storage: ['ElasticSearch', 'Redis cache', 'Geo DB'],
    protocols: ['REST', 'gRPC'],
    scaleStrategy: 'Read-heavy horizontal scaling with cache warming for popular origin-destination pairs.'
  },
  {
    name: 'Booking Service',
    responsibilities: ['inventory lock', 'passenger manifest', 'ticket issuance', 'Saga orchestration'],
    storage: ['PostgreSQL', 'Kafka outbox', 'Redis distributed locks'],
    protocols: ['REST', 'Kafka'],
    scaleStrategy: 'Partition by train-date-class and use idempotency keys to survive retries.'
  },
  {
    name: 'Payment Service',
    responsibilities: ['Razorpay integration', 'UPI collect', 'wallet debits', 'refund initiation'],
    storage: ['PostgreSQL ledger', 'Kafka payment events'],
    protocols: ['REST', 'Webhook', 'Kafka'],
    scaleStrategy: 'Queue callbacks and reconcile asynchronously with exactly-once ledger writes.'
  },
  {
    name: 'PNR Service',
    responsibilities: ['PNR lookup', 'status cache', 'charting updates', 'waitlist transition feed'],
    storage: ['MongoDB', 'Redis cache'],
    protocols: ['REST', 'WebSocket'],
    scaleStrategy: 'Serve reads from Redis and stream cache invalidations through Kafka.'
  },
  {
    name: 'Notification Service',
    responsibilities: ['WebSocket fanout', 'email', 'SMS', 'push notifications'],
    storage: ['Kafka topics', 'template store'],
    protocols: ['WebSocket', 'SMTP', 'SMS gateway', 'Push'],
    scaleStrategy: 'Shard fanout workers by user and journey identifiers.'
  },
  {
    name: 'AI Service',
    responsibilities: ['confirmation prediction', 'recommendations', 'OCR extraction', 'complaint triage'],
    storage: ['Feature store', 'model registry', 'vector index'],
    protocols: ['gRPC', 'REST'],
    scaleStrategy: 'Run TensorFlow, PyTorch, and ONNX models behind autoscaled inference endpoints.'
  },
  {
    name: 'Analytics Service',
    responsibilities: ['clickstream', 'conversion metrics', 'capacity dashboards', 'fraud analytics'],
    storage: ['ClickHouse', 'Druid', 'Superset dashboards'],
    protocols: ['Kafka', 'SQL'],
    scaleStrategy: 'Ingest events through Kafka and isolate OLAP workloads from booking paths.'
  },
  {
    name: 'User Service',
    responsibilities: ['profile', 'saved passengers', 'preferences', 'accessibility settings'],
    storage: ['PostgreSQL', 'Redis', 'LDAP'],
    protocols: ['REST', 'gRPC'],
    scaleStrategy: 'Cache hot profiles and replicate reads across regions.'
  }
];
