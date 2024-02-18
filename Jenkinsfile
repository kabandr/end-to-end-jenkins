pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "${secrets.DOCKER_USERNAME}"
        DOCKER_PASSWORD = "${secrets.DOCKER_PASSWORD}"
    }

    tools {
        nodejs 'nodejs LTS'
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

        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        def imageName = 'kabandr/demo-app:latest'
                        docker.build(imageName, '.')
                        docker.image(imageName).push()
                    }
                }
            }
        }
    }
}
