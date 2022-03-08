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
                script {
                    if (env.PRODUCTION_ENV == 'staging') {
                        echo 'Executing for staging'
                        sh 'npm run build --mode=staging' 
                    } else if (env.PRODUCTION_ENV == 'production') {
                        echo 'Executing production'
                        sh 'npm run build --mode=production' 
                    } else {
                        echo "Not sure about productin envoromnet"
                        sh 'npm run build --mode=staging' 
                    }
                }
            }
        }
    }
}
