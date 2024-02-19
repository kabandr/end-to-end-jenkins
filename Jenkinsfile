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

        stage('Build image') {
            app = docker.build('kabandr/demo-app')
        }

        // stage('Docker Build & Push to Registry') {
        //     steps {
        //         script {
        //             withDockerRegistry(credentialsId: 'docker-credentials-id', toolName: 'Docker') {
        //                 def imageName = 'kabandr/demo-app:latest'
        //                 docker.build(imageName, '.')
        //                 docker.image(imageName).push()
        //             }
        //         }
        //     }
        // }
    }
}
