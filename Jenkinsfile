pipeline
{
    agent any
    environment
    {
    PATH = "/usr/local/bin:${env.PATH}"
    }
    stages{
        stage('Check docker') {
            steps {
               sh 'which docker && docker --version'
            }
        }
        stage('Checkout') {
            steps {
               checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t playwright-api-tests .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'docker run --rm -v $PWD/playwright-report:/app/playwright-report playwright-api-tests npx playwright test tests/apiTests/carsApi.spec.ts'
            }
        }
    }
           
    post {
      always {
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true    
      }
    }
}