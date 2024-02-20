pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                changelog: false,
                poll: false,
                url: 'https://github.com/kabandr/end-to-end-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Static Analysis') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh 'docker build -t kabandr/demo-app .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        sh "echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Docker Push to Registry') {
            steps {
                script {
                    sh 'docker push kabandr/demo-app'
                }
            }
        }

        stage('Deploy to EKS') {
            environment {
                SERVER_URL = credentials('cluster-url').url
                CA_CERT = credentials('caCertificate').secret
            }
            steps {
                withCredentials([file(credentialsId: 'cluster-credentials-id', variable: 'KUBECONFIG_FILE'), string(credentialsId: 'caCertificate', variable: 'CA_CERT')]) {
                    sh 'export KUBECONFIG=$KUBECONFIG_FILE'
                    kubeconfig(credentialsId: 'cluster-credentials-id', serverUrl: "${SERVER_URL}", caCertificate: "${CA_CERT}") {
                        sh 'kubectl get pods'
                        sh 'kubectl apply -f kube/deployment.yaml'
                        sh 'kubectl rollout status deployment/demo-deployment'
                    }
                }
            }
        }
    }
}
