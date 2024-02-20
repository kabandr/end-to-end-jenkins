# Jenkins CI/CD Pipeline

## Description

This project is a demo for an End-To-End CI/CD using Jenkins. It includes the necessary files and configurations for building, testing, and deploying a basic Node.js application.

## Prerequisites

- Node.js
- Docker
- DockerHub account
- Jenkins (You can find a Docker Compose file for Docker installation in the folder ./jenkins)
- Kubectl
- [ekstcl](https://eksctl.io/getting-started/) for EKS
- [oci](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm) for OKE


## Installation

### For a step by step installation:

1. Clone the Repository

```
git clone https://github.com/kabandr/end-to-end-jenkins.git
```

2. Navigate to the Project Directory
```
cd end-to-end-jenkins
```
3. Install Node.js Dependencies

```
npm install
```

4. Build the Docker Image
```
docker build -t <your-dockerhub-username>/demo-app .
```

5. Log in to Docker Registry

```
docker login -u DOCKERHUB_USERNAME -p DOCKERHUB_PASSWORD
```
Replace DOCKERHUB_USERNAME and DOCKERHUB_PASSWORD with your Docker Hub credentials.


6. Push the Docker Image to Registry: Push the Docker image to your Docker Hub repository.

```
docker push <your-dockerhub-username>/demo-app
```

7. Create Kubernetes Cluster

For EKS, run this command in the root folder:

```
eksctl create cluster -f cluster.yaml
```

For OKE, run this command in the root folder:

```
oci ce cluster create --config-file oke-cluster.yaml
```

8. Deploy to Kubernetes (EKS)

```
kubectl apply -f deployment.yaml
kubectl rollout status deployment/demo-deployment
```
## Usage

The app is a basic express API with 2 endpoints:

```
<PUBLIC_IP>/            # Returns a string "Hello World!
<PUBLIC_IP>/books  # Returns a json object with an array of books
```