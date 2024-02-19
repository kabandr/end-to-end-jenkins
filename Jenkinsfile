pipeline {
    agent any

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

        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build -t kabandr/demo-app .'
            }
        }
    }
}
