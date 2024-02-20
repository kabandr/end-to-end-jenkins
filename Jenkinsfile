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

        stage('Docker Push to Registry') {
            steps {
                script {
                    sh 'docker push kabandr/demo-app'
                }
            }
        }
    }
}
