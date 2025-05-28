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

        LIBREOFFICE_PATH      = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe'
    }

    stages {
        stage('Check Python') {
            steps {
                bat 'python --version'
                bat 'pip --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    python -m venv venv
                    call venv\\Scripts\\activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Run Django Checks') {
            steps {
                bat '''
                    call venv\\Scripts\\activate
                    python manage.py check
                '''
            }
        }

        // Optional stage to run server, not recommended for CI
        // Use only if you're using Jenkins like a dev launch tool
        // Comment this out in production
        stage('Run Django Server (dev only)') {
            steps {
                bat '''
                    call venv\\Scripts\\activate
                    start /B python manage.py runserver 0.0.0.0:8000
                '''
            }
        }
    }
}