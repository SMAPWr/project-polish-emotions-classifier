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

### Cluster configuration

If you don't have a `kubectl` or `k3sup` or `helm` already available, follow the instructions below:
- [kubectl and k3sup installation](#kubectl-and-k3sup-installation)
- [helm installation](#helm-installation)


#### If you don't have `kubeconfig` yet:
If you have both then edit `./init_vars.sh` and fill it up with your AWS Machines IPs and path to ssh key (`.pem` file from AWS).

```
# Add execution right to vars initialization and setup script
chmod +x init_vars.sh
chmod +x setup_cluster.sh

# Import vars with your cluster data
. init_vars.sh

# Setup cluster
./setup_cluster.sh
export KUBECONFIG=$PWD/kubeconfig
```

#### If you have `kubeconfig`:

```shell
export KUBECONFIG=$PWD/kubeconfig
```

After that, just check if nodes are available:

```shell
kubectl get node -o wide
```

### Deploy application:

> You might have to setup `REACT_APP_API_URL` in configmap with correct value for your Elastic IP (API server node)

```
helm install polemic polemic
```

Check if everything works fine 
```
kubectl get pods
kubectl get services
```
```shell
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE     SELECTOR
kubernetes   ClusterIP   x.x.x.x         <none>        443/TCP          4m55s   <none>
web          NodePort    x.x.x.x         <none>        3000:30001/TCP   2m58s   io.kompose.service=web
polemic      NodePort    x.x.x.x         <none>        8008:30008/TCP   2m58s   app.kubernetes.io/instance=polemic,app.kubernetes.io/name=polemic
```

You should be able to access web app at `YOUR_NODE_IP:30001` and API docs at `YOUR_NODE_IP:30008`. Both of them should work correctly if you've setup path in configmap

If any change is necessary (like update of that var) please run:
```
helm upgrade polemic polemic
```

Uou should be also able to use FE version deployed on GH [https://smapwr.github.io/project-polish-emotions-classifier/](https://smapwr.github.io/project-polish-emotions-classifier/)

### Additional resources

##### `kubectl` and `k3sup` installation

Instructions are designed to work on Ubuntu Xenial (18.04), is your version is different please provide the correct repository.

```shell
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
curl -sfL https://get.k3s.io | sh -
```

##### `helm` installation

```shell
chmod +x get_helm.sh
./get_helm.sh
```