pipeline {
     agent {
        docker {
            image 'node:14'
            args '-p 3010:5000'
        }
    }
    environment {
        HOME = '.'
        CI = 'true' 
    }
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run build' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'npm run serve' 
            }
        }
    }
}
