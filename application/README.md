# Standalone Application

Run if from this directory or specify the correct path to `docker-compose.yaml` files.

### Production build

If you're running API server on a different address please add it into `./web/.env.production` before building.

```
docker-compose up --build
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
docker-compose -f docker-compose.dev.yaml up --build
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

# Cluster configuration

```
export MASTER_IP=<master public ip>
export NODE1_IP=<node 1 public ip>
export NODE2_IP=<node 2 public ip>

## Configure cluster

k3sup install --ip $MASTER_IP --user ubuntu --ssh-key testssh.pem
k3sup join --ip $NODE1_IP --server-ip $MASTER_IP --user ubuntu --ssh-key testssh.pem
k3sup join --ip $NODE2_IP --server-ip $MASTER_IP --user ubuntu --ssh-key testssh.pem

export KUBECONFIG= path/to/kubeconfig
kubectl config set-context default
kubectl get node -o wide
```

# Helm:

```
helm install emotion-classifier  docker-compose
```


check if everything works fine
```
kubectl get pods
```


to upgrade use
```
helm upgrade emotion-classifier  docker-compose
```

