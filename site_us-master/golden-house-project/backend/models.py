# models.py
from extensions import db  # <--- ИЗМЕНЕНИЕ ЗДЕСЬ
import json

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    main_image_url = db.Column(db.String(200))
    discount_tag = db.Column(db.String(50), nullable=True)

    status = db.Column(db.String(50), default="Строится")
    project_class = db.Column(db.String(50), default="Бизнес")
    deadline = db.Column(db.String(50))
    floors = db.Column(db.Integer)
    apartments = db.Column(db.Integer)
    address = db.Column(db.String(200))

    _gallery = db.Column('gallery', db.Text, default='[]')

    @property
    def gallery(self):
        return json.loads(self._gallery)

    @gallery.setter
    def gallery(self, value):
        self._gallery = json.dumps(value)

    def __repr__(self):
        return f'<Project {self.title}>'

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    short_description = db.Column(db.String(200), nullable=True) # <-- НОВОЕ ПОЛЕ
    description = db.Column(db.Text, nullable=False)
class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False) # Краткое описание для карточки
    detailed_description = db.Column(db.Text, nullable=True) # Поле для страницы акции
    bg_image_url = db.Column(db.String(200))
    expires_on = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Promotion {self.title}>'