pipeline {
     agent {
        docker {
            image 'node:14'
            args '-p 3010:3000'
        }
    }
    environment {
        HOME = '.'
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
