# Emotion-API

### Production build

If you're running API server on a different address please add it into `./web/.env.production` before building.

```
docker compose up --build
```

API available at:

```
http://127.0.0.1:8002
```

Web application available at:
```
http://localhost/project-polish-emotions-classifier/
```

### Dev build

```
docker compose -f docker-compose.dev.yaml up --build
```

API available at:

```
http://127.0.0.1:8002
```

If you're running API server on a different address please add it into `./web/.env.development`.

Web application available at:
```
http://localhost:3001/project-polish-emotions-classifier/
```