pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'yarn install' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'yarn start' 
            }
        }
    }
}
