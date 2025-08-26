# backend/admin.py
from flask import request, current_app
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms.fields import FileField
from werkzeug.utils import secure_filename
import os

from models import Project, Promotion, NewsItem
from extensions import db


# Вспомогательный метод для сохранения файлов, чтобы не дублировать код
def _save_file(file_data):
    if file_data and file_data.filename:
        filename = secure_filename(file_data.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file_data.save(file_path)
        return filename
    return None


class ProjectAdminView(ModelView):
    """Кастомизированное представление для управления Проектами."""
    column_list = ('title', 'status', 'deadline')
    form_columns = [
        'title', 'short_description', 'description', 'discount_tag', 'main_image_url', '_gallery',
        'status', 'project_class', 'deadline', 'floors', 'apartments', 'address'
    ]
    form_widget_args = {
        '_gallery': {'readonly': True}
    }
    form_overrides = {
        'main_image_url': FileField
    }

    # --- ВОТ ЭТОТ БЛОК СОЗДАЕТ ПОЛЕ ДЛЯ ЗАГРУЗКИ ГАЛЕРЕИ ---
    form_extra_fields = {
        'gallery_upload': FileField('Upload Images to Gallery', render_kw={'multiple': True})
    }

    # ----------------------------------------------------

    def on_model_change(self, form, model, is_created):
        """Обрабатывает загрузку главного изображения и галереи."""
        main_image_file = request.files.get(form.main_image_url.name)
        if main_image_file:
            model.main_image_url = _save_file(main_image_file)

        # --- ЭТОТ БЛОК ОБРАБАТЫВАЕТ ЗАГРУЖЕННЫЕ ФАЙЛЫ ГАЛЕРЕИ ---
        gallery_files = request.files.getlist('gallery_upload')
        if gallery_files and gallery_files[0].filename:
            current_gallery = model.gallery or []
            for file in gallery_files:
                filename = _save_file(file)
                if filename:
                    current_gallery.append(filename)
            model.gallery = current_gallery
        # ----------------------------------------------------


class PromotionAdminView(ModelView):
    """Кастомизированное представление для управления Акциями."""
    form_columns = ['title', 'description', 'detailed_description', 'bg_image_url', 'expires_on']
    form_overrides = {
        'bg_image_url': FileField
    }

    def on_model_change(self, form, model, is_created):
        bg_image_file = request.files.get(form.bg_image_url.name)
        if bg_image_file:
            model.bg_image_url = _save_file(bg_image_file)


class NewsAdminView(ModelView):
    """Кастомизированное представление для управления Новостями."""
    form_columns = ['title', 'date', 'description', 'image_url']
    column_list = ('title', 'date')
    form_overrides = {
        'image_url': FileField
    }

    def on_model_change(self, form, model, is_created):
        image_file = request.files.get(form.image_url.name)
        if image_file:
            model.image_url = _save_file(image_file)


def create_admin(app, db):
    """Инициализирует и настраивает админ-панель."""
    admin = Admin(app, name='Golden House Admin', template_mode='bootstrap4')

    admin.add_view(ProjectAdminView(Project, db.session))
    admin.add_view(PromotionAdminView(Promotion, db.session))
    admin.add_view(NewsAdminView(NewsItem, db.session, name="Новости"))

    return admin