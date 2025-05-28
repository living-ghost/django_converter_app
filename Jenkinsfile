pipeline {
    agent any

    environment {
        DJANGO_SECRET_KEY     = credentials('DJANGO_SECRET_KEY')
        DEBUG                 = 'True'
        DJANGO_ALLOWED_HOSTS  = 'localhost,127.0.0.1'

        DB_HOST               = 'localhost'
        DB_PORT               = '5432'
        DB_NAME               = credentials('DB_NAME')
        DB_USER               = credentials('DB_USER')
        DB_PWD                = credentials('DB_PWD')

        EMAIL_HOST            = 'smtp.gmail.com'
        EMAIL_PORT            = '587'
        EMAIL_USE_TLS         = 'True'
        EMAIL_HOST_USER       = credentials('EMAIL_HOST_USER')
        EMAIL_HOST_PASSWORD   = credentials('EMAIL_HOST_PASSWORD')

        IMAGE_NAME            = 'living9host/converter_app'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: ${IMAGE_NAME}:latest"
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing image to Docker Hub as ${IMAGE_NAME}:latest"
                    docker.withRegistry('https://index.docker.io/v1/', 'jenkins-docker-integration') {
                        docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
        }
    }
}