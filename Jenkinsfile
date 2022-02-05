pipeline {
    //  agent {
    //     docker {
    //         image 'node:14'
    //         args '-p 3010:5000'
    //     }
    // }
    agent any

    tools {nodejs "node"}
    
    environment {
        HOME = '.'
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
    }
}
