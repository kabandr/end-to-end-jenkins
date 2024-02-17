pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                changelog: false,
                poll: false,
                url: 'https://github.com/kabandr/end-to-end-jenkins.git'
            }
        }

        stage('Build') {
            steps {
                    script {
                        sh 'npm install'
                    }
            }
        }

        stage('Test') {
            steps {
                    script {
                        sh 'npm run test'
                    }
            }
        }
    }
}
