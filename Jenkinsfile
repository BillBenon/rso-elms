pipeline {
    //  agent {
    //     docker {
    //         image 'node:16-alpine'
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
                sh 'yarn install' 
            }
        }
        stage('Build') { 
            steps {
                script {
                    if (env.PRODUCTION_ENV == 'staging') {
                        echo 'Executing for staging'
                        sh 'yarn run build -- --mode=staging' 
                    } else if (env.PRODUCTION_ENV == 'production') {
                        echo 'Executing production'
                        sh 'yarn run build -- --mode=production' 
                    } else {
                        echo "Not sure about productin envoromnet"
                        sh 'yarn run build ' 
                    }
                }
            }
        }
    }
}
