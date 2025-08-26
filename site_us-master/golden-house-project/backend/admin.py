# backend/admin.py
from flask import request, current_app
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from werkzeug.utils import secure_filename
import os

# Импортируем только то, что нам точно нужно
from wtforms.fields import FileField

from models import Project, Promotion, NewsItem
from extensions import db


# Вспомогательный метод для сохранения файлов (без изменений)
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

    # Убираем все form_columns и form_overrides, так как мы будем управлять формой напрямую

    # --- ИЗМЕНЕНИЕ: Используем scaffold_form для надежного добавления полей ---
    def scaffold_form(self):
        """
        Этот метод вызывается Flask-Admin для создания класса формы.
        Мы "перехватываем" его, чтобы добавить наши поля.
        """
        # Сначала получаем стандартную форму, сгенерированную из модели
        form_class = super(ProjectAdminView, self).scaffold_form()

        # Теперь добавляем наши поля для загрузки файлов
        form_class.main_image_url = FileField('Main Image')
        form_class.gallery_image_1 = FileField('Gallery Image 1')
        form_class.gallery_image_2 = FileField('Gallery Image 2')
        form_class.gallery_image_3 = FileField('Gallery Image 3')
        form_class.gallery_image_4 = FileField('Gallery Image 4')
        form_class.gallery_image_5 = FileField('Gallery Image 5')
        form_class.gallery_image_6 = FileField('Gallery Image 6')

        return form_class

    def on_model_change(self, form, model, is_created):
        """Обрабатывает загрузку всех изображений."""
        # Обработка главного изображения
        if form.main_image_url.data:
            model.main_image_url = _save_file(form.main_image_url.data)

        # Новая логика для галереи
        current_gallery = model.gallery or []
        gallery_slots = (current_gallery + [None] * 6)[:6]

        # Проверяем каждое из 6 полей
        for i in range(6):
            field_name = f'gallery_image_{i + 1}'
            # Получаем данные из поля формы
            field_data = getattr(form, field_name).data
            if field_data:
                filename = _save_file(field_data)
                if filename:
                    gallery_slots[i] = filename

        # Сохраняем результат
        model.gallery = [img for img in gallery_slots if img]


# --- Остальные классы остаются без изменений ---
class PromotionAdminView(ModelView):
    form_columns = ['title', 'description', 'detailed_description', 'bg_image_url', 'expires_on']
    form_overrides = {'bg_image_url': FileField}

    def on_model_change(self, form, model, is_created):
        if 'bg_image_url' in request.files and request.files['bg_image_url'].filename:
            model.bg_image_url = _save_file(request.files['bg_image_url'])


class NewsAdminView(ModelView):
    form_columns = ['title', 'date', 'description', 'image_url']
    column_list = ('title', 'date')
    form_overrides = {'image_url': FileField}

    def on_model_change(self, form, model, is_created):
        if 'image_url' in request.files and request.files['image_url'].filename:
            model.image_url = _save_file(request.files['image_url'])


def create_admin(app, db):
    admin = Admin(app, name='Golden House Admin', template_mode='bootstrap4')
    admin.add_view(ProjectAdminView(Project, db.session))
    admin.add_view(PromotionAdminView(Promotion, db.session))
    admin.add_view(NewsAdminView(NewsItem, db.session, name="Новости"))
    return admin