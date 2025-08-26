# backend/app.py
from flask import Flask
from flask_cors import CORS
import os
from extensions import db
from routes import api as api_blueprint
from admin import create_admin

# Используем "фабрику приложений" - это более надежный паттерн
def create_app():
    app = Flask(__name__)
    CORS(app)

    # --- Конфигурация ---
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'uploads')
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['SECRET_KEY'] = 'your_very_secret_key'
    # Указываем абсолютный путь к БД внутри папки 'instance'
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(app.instance_path, 'project.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Гарантируем, что папка 'instance' существует
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # --- Инициализация расширений ---
    db.init_app(app)
    create_admin(app, db)

    # --- Регистрация роутов ---
    app.register_blueprint(api_blueprint)

    return app

# --- Запуск ---
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Создаем таблицы только один раз при запуске
        db.create_all()
    app.run(host='0.0.0.0', port=5010, debug=True)