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

## For a step by step installation:

1. Clone the Repository: Clone the repository to your local machine.

```
git clone https://github.com/kabandr/end-to-end-jenkins.git
```

2. Navigate to the Project Directory: Change into the project directory.
```
cd end-to-end-jenkins
```
3. Install Node.js Dependencies: Use npm to install the Node.js dependencies.

```
npm install
```

4. Build the Docker Image: Build the Docker image for the demo application.
```
docker build -t <your-dockerhub-username>/demo-app .
```

5. Log in to Docker Registry: Log in to Docker Hub to push the Docker image.
```
docker login -u DOCKERHUB_USERNAME -p DOCKERHUB_PASSWORD
```

6. Replace DOCKERHUB_USERNAME and DOCKERHUB_PASSWORD with your Docker Hub credentials.


7. Push the Docker Image to Registry: Push the Docker image to your Docker Hub repository.

```
docker push <your-dockerhub-username>/demo-app
```

8. Create Kubernetes Cluster

For EKS, run this command in the root folder:

```
eksctl create cluster -f cluster.yaml
```

For OKE, run this command in the root folder:

```
oci ce cluster create --config-file oke-cluster.yaml
```

9. Deploy to Kubernetes (EKS): Apply the Kubernetes deployment configuration to your EKS cluster.

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

## Files

The project includes the following files:

- **books.js**: JavaScript file containing bookstore functionality.
- **deployment.yaml**: Kubernetes deployment configuration for the demo application.
- **docker-compose.yml**: Docker Compose configuration (if applicable).
- **Dockerfile**: Dockerfile for building the Docker image.
- **eks-cluster.yaml**: EKS cluster configuration (if applicable).
- **index.js**: Main entry point for the demo application.
- **Jenkinsfile**: Jenkins pipeline configuration for CI/CD.
- **LICENSE**: License file for the project.
- **oke-cluster.yaml**: Oracle Kubernetes Engine cluster configuration (if applicable).
- **package.json**: Node.js package configuration file.
- **package-lock.json**: npm package lock file.
- **README.md**: Documentation file (this file).
- **test.js**: Test file for the demo application.