# backend/admin.py
from flask import request, current_app
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from werkzeug.utils import secure_filename
import os
from wtforms.fields import FileField, BooleanField

from models import Project, Promotion, NewsItem
from extensions import db

# Вспомогательный метод для сохранения файлов
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

    def scaffold_form(self):
        """
        Этот метод вызывается Flask-Admin для создания класса формы.
        Мы "перехватываем" его, чтобы добавить наши поля.
        """
        # Сначала получаем стандартную форму, сгенерированную из модели
        form_class = super(ProjectAdminView, self).scaffold_form()
        form_class.main_image_url = FileField('Main Image')
        for i in range(1, 7):
            setattr(form_class, f'gallery_image_{i}', FileField(f'Gallery Image {i}'))
            setattr(form_class, f'gallery_image_{i}_delete', BooleanField('Delete'))

        return form_class

    def on_model_change(self, form, model, is_created):
        """Обрабатывает загрузку и удаление изображений галереи."""
        if form.main_image_url.data:
            model.main_image_url = _save_file(form.main_image_url.data)

        current_gallery = list(model.gallery or [])
        new_gallery = []

        for i in range(6):
            # Получаем данные из полей формы
            field_data = getattr(form, f'gallery_image_{i + 1}').data
            delete_checked = getattr(form, f'gallery_image_{i + 1}_delete').data

            # Определяем, какое изображение было на этой позиции раньше
            old_image = current_gallery[i] if i < len(current_gallery) else None

            # 1. Если загружен новый файл, он имеет высший приоритет
            if field_data and field_data.filename:
                filename = _save_file(field_data)
                if filename:
                    new_gallery.append(filename)
            # 2. Если новый файл не загружен и не стоит галочка "Удалить"
            elif not delete_checked and old_image:
                new_gallery.append(old_image)
            # 3. Если стоит галочка "Удалить" или нет ни старого, ни нового файла,
            # то слот остается пустым и в new_gallery ничего не добавляется.

        model.gallery = new_gallery

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