# Microservices (Node.js, React.js, NATS, Mongo, Docker, Kuberneetes) - In Development, Incomplete ATM

###### This is a project which setup microservices and cover these node.js, react.js, react SSR next.js, mongodb, mongoose, docker (images), kubernetes (pods, services, deployments, ingress), NATS (event bus, publisher, subscriber), google cloud gcloud, CICD, concurrency, worker services, payment stripe, signup, signin, session, jwt, auth, cookies, validation, testing, npm, code sharing.

## How to set it up it on your local machine

### Step 1 - clone microservices repo

```
git clone https://github.com/zohaibtariq/microservices
```
move to the cloned repo
```
cd microservices
```

### Step 2 - install docker

make sure installation in terminal with

```
docker version
```

### Step 3 - build images of your services with docker

you can replace **zohaibtariq** with your dockerhub username, execute all of them one by one

make sure you are inside microservices/client
```
cd microservices/client
docker build -t zohaibtariq/client .
docker push zohaibtariq/client
```

make sure you are inside microservices/comments
```
cd microservices/comments
docker build -t zohaibtariq/comments .
docker push zohaibtariq/comments
```

make sure you are inside microservices/event-bus
```
cd microservices/event-bus
docker build -t zohaibtariq/event-bus .
docker push zohaibtariq/event-bus
```

make sure you are inside microservices/moderation
```
cd microservices/moderation
docker build -t zohaibtariq/moderation .
docker push zohaibtariq/moderation
```

make sure you are inside microservices/posts
```
cd microservices/posts
docker build -t zohaibtariq/posts .
docker push zohaibtariq/posts
```

make sure you are inside microservices/query
```
cd microservices/query
docker build -t zohaibtariq/query .
docker push zohaibtariq/query
```

### Step 4 - setup kubernetes

make sure installation in terminal with

```
kubectl version
```

### Step 5 - setup kubernetes nginx ingress

please see docs according to your OS at

```
https://kubernetes.github.io/ingress-nginx/
```

for MAC OS it is this ATM (at the moment)

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### Step 6 - setup skaffold

please see docs and install skaffold from

```
https://skaffold.dev/docs/
```

### Step 7 - install all infra configs to ubuntu

make sure you are inside microservices/infra/k8s
```
cd microservices/infra/k8s
```

it will apply all yaml configs in kubernetes
```
kubectl -f .
```

### Step 8 - skaffold dev

make sure you are at the root of microservices repo
```
cd microservices
```

```
skaffold dev
```

### Step 9 - update hosts

make sure you update hosts file if you are developing locally
```
sudo nano /etc/hosts
```
```
127.0.0.1 posts.com
```

## NOTES

##### this is not production ready it is in development I am mentioning some related helpful commands it is not must required to execute them all mentioned below

##### Skaffold Notes

you can run other scaffold commands with (see docs for more)

```
skaffold dev -v debug
```
```
skaffold build
```

##### Kubernetes Commands
If you make any changes in code make sure you must build new image and push it as mentioned above at **STEP 3**

If you made any change inside **microservices/infra/k8s**

make sure you execute that individual file with following command to reload that change inside kubernetes cluster

```
cd microservices/infra/k8s
```
```
kubectl apply -f client-depl.yaml
```
```
kubectl apply -f comments-depl.yaml
```
```
kubectl apply -f event-bus-depl.yaml
```
```
kubectl apply -f ingress-srv.yaml
```
```
kubectl apply -f moderation-depl.yaml
```
```
kubectl apply -f posts-depl.yaml
```
```
kubectl apply -f posts-srv.yaml
```
```
kubectl apply -f query-depl.yaml
```
**to check kubernetes pods, services & deployments.**
```
kubectl get pods
```
```
kubectl get services
```
```
kubectl get deployments
```
**to see your changes being reflect make sure to execute these commands if you have not setup skaffold**

```
kubectl rollout restart deployment client-depl
```
```
kubectl rollout restart deployment comments-depl
```
```
kubectl rollout restart deployment event-bus-depl
```
```
kubectl rollout restart deployment moderation-depl
```
```
kubectl rollout restart deployment posts-depl
```
```
kubectl rollout restart deployment query-depl
```

**other kubernetes commands**

NAME can be of pod, service or deployment name

```
docker exec -t [CONTAINERID] [CMD]
```
```
kubectl logs [NAME]
```
```
kubectl delete [POD|SERVICE|DEPLOYMENT] [NAME]
```
```
kubectl apply -f [CONFIG FILE NAME]
```
```
kubectl describe [POD|SERVICE|DEPLOYMENT] [NAME]
```

##### Docker Commands

**to execute each service in docker you can run each docker with**

```
docker run zohaibtariq/client
```
```
docker run zohaibtariq/comments
```
```
docker run zohaibtariq/event-bus
```
```
docker run zohaibtariq/moderation
```
```
docker run zohaibtariq/posts
```
```
docker run zohaibtariq/query
```

**to see running docker containers**

```
docker ps
```

**to see running and stopped docker containers**

```
docker ps -a
```

**to see logs of a docker container**

```
docker logs [CONTAINERID]
```

**to execute command inside a docker container**

```
docker exec -t [CONTAINERID] [CMD]
```

**to remove dangling docker containers**

```
docker container prune -f
```
```
docker image prune -f
```
```
docker volume prune -f
```
```
docker network prune -f
```
```
docker system prune -f
```
## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Zohaib Tariq](https://github.com/zohaibtariq)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.