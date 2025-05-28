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
        PYTHON_PATH           = 'C:\\Users\\HP\\AppData\\Local\\Programs\\Python\\Python313\\python.exe'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat '''
                    "%PYTHON_PATH%" -m venv venv
                    call venv\\Scripts\\activate
                    venv\\Scripts\\python.exe -m pip install --upgrade pip
                    venv\\Scripts\\python.exe -m pip install -r requirements.txt
                '''
            }
        }

        stage('Run Django Server') {
            steps {
                bat '''
                    venv\\Scripts\\python.exe manage.py runserver 0.0.0.0:8000
                '''
            }
        }
    }
}