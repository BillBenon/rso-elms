pipeline {
     agent {
        docker {
            image 'node:6-alpine'
            args '-p 3010:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'npm start' 
            }
        }
    }
}
