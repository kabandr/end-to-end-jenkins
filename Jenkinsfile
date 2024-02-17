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

        stage('Install Dependencies') {
            steps {
                    nodejs('nodejs LTS') {
                        sh 'npm install'
                    }
            }
        }

         stage('Static Analysis') {
            steps {
                    nodejs('nodejs LTS') {
                        sh 'npm run lint'
                    }
            }
        }
    }
}
