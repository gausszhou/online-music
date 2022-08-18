pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                yarn
                yarn build
                docker build -t netease-music-cloud .
                docker save netease-music-cloud:latest | gzip >  netease-music-cloud-latest.tar.gz
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                scp -P 2222 -r "netease-music-cloud-latest.tar.gz" root@8.218.79.208:/docker/project
            }
        }
    }
}