# backend/admin.py
from flask import request, current_app
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms.fields import FileField
from werkzeug.utils import secure_filename
import os

from models import Project, Promotion
from extensions import db


class ProjectAdminView(ModelView):
    """
    Кастомизированное представление для управления Проектами в админ-панели.
    """
    # Отображаемые колонки в списке проектов
    column_list = ('title', 'status', 'deadline')

    # Поля, доступные в форме создания/редактирования
    form_columns = [
        'title', 'short_description', 'description', 'discount_tag', 'main_image_url', '_gallery',
        'status', 'project_class', 'deadline', 'floors', 'apartments', 'address'
    ]

    # Делаем поле _gallery (где хранится JSON) только для чтения
    form_widget_args = {
        '_gallery': {
            'readonly': True
        }
    }

    # Заменяем стандартное текстовое поле для main_image_url на поле для загрузки файла
    form_overrides = {
        'main_image_url': FileField
    }

    # Добавляем дополнительное поле для множественной загрузки файлов в галерею
    form_extra_fields = {
        'gallery_upload': FileField('Upload Images to Gallery', render_kw={'multiple': True})
    }

    def _save_file(self, file_data):
        """Безопасно сохраняет файл в папку uploads и возвращает его имя."""
        if file_data and file_data.filename:
            filename = secure_filename(file_data.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file_data.save(file_path)
            return filename
        return None

    def on_model_change(self, form, model, is_created):
        """
        Выполняется при сохранении модели (создании или обновлении).
        Обрабатывает загрузку файлов.
        """
        # Обработка загрузки главного изображения
        main_image_file = request.files.get(form.main_image_url.name)
        if main_image_file:
            model.main_image_url = self._save_file(main_image_file)

        # Обработка загрузки изображений для галереи
        gallery_files = request.files.getlist('gallery_upload')
        if gallery_files and gallery_files[0].filename:
            current_gallery = model.gallery or []
            for file in gallery_files:
                filename = self._save_file(file)
                if filename:
                    current_gallery.append(filename)
            model.gallery = current_gallery


class PromotionAdminView(ModelView):
    """
    Кастомизированное представление для управления Акциями.
    """
    # Поля в форме создания/редактирования
    form_columns = ['title', 'description', 'detailed_description', 'bg_image_url', 'expires_on']

    # Заменяем стандартное поле на загрузку файла
    form_overrides = {
        'bg_image_url': FileField
    }

    def _save_file(self, file_data):
        """Безопасно сохраняет файл."""
        if file_data and file_data.filename:
            filename = secure_filename(file_data.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file_data.save(file_path)
            return filename
        return None

    def on_model_change(self, form, model, is_created):
        """Обрабатывает загрузку фонового изображения для акции."""
        bg_image_file = request.files.get(form.bg_image_url.name)
        if bg_image_file:
            model.bg_image_url = self._save_file(bg_image_file)


def create_admin(app, db):
    """
    Инициализирует и настраивает админ-панель.
    """
    admin = Admin(app, name='Golden House Admin', template_mode='bootstrap4')

    # Добавляем представления моделей в админ-панель
    admin.add_view(ProjectAdminView(Project, db.session))
    admin.add_view(PromotionAdminView(Promotion, db.session))

    return admin