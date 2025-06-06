pipeline {
    agent any

    stages {

        stage('Check Docker') {
            steps {
                sh 'which docker && docker --version'
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build("playwright-api-tests")
                }
            }
        }

        stage('Run API tests') {
            steps {
                script {
                    dockerImage.inside('--rm') {
                        sh 'npx playwright test tests/apiTests/carsApi.spec.ts'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}