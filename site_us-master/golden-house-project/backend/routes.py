# backend/routes.py
from flask import jsonify, Blueprint, url_for, request
from models import Project, Promotion
from extensions import db

# Создаем "чертеж" (Blueprint) для всех API-маршрутов.
# Это помогает структурировать приложение и избежать циклических импортов.
api = Blueprint('api', __name__, url_prefix='/api')


def project_to_dict(project):
    """
    Вспомогательная функция для преобразования объекта Project из базы данных
    в JSON-совместимый словарь (dict).
    """
    return {
        'id': project.id,
        'title': project.title,
        'short_description': project.short_description,
        'description': project.description,
        'main_image_url': url_for('static', filename=f'uploads/{project.main_image_url}', _external=True) if project.main_image_url else None,
        'discount_tag': project.discount_tag,
        'status': project.status,
        'class': project.project_class,
        'deadline': project.deadline,
        'floors': project.floors,
        'apartments': project.apartments,
        'address': project.address,
        'gallery': [url_for('static', filename=f'uploads/{img}', _external=True) for img in project.gallery]
    }


def promotion_to_dict(promo, is_detailed=False):
    """
    Вспомогательная функция для преобразования объекта Promotion
    в JSON-совместимый словарь (dict).
    """
    data = {
        'id': promo.id,
        'title': promo.title,
        'description': promo.description,
        'bg': url_for('static', filename=f'uploads/{promo.bg_image_url}', _external=True) if promo.bg_image_url else None,
        'expires_on': promo.expires_on
    }
    # Если запрашивается детальная информация, добавляем дополнительное поле
    if is_detailed:
        data['detailed_description'] = promo.detailed_description
    return data


# --- Маршруты для Проектов ---

@api.route('/projects', methods=['GET'])
def get_projects():
    """Возвращает список всех проектов."""
    projects = Project.query.all()
    return jsonify([project_to_dict(p) for p in projects])


@api.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    """Возвращает данные одного конкретного проекта по его ID."""
    project = Project.query.get_or_404(id)
    return jsonify(project_to_dict(project))


# --- Маршруты для Акций ---

@api.route('/promotions', methods=['GET'])
def get_promotions():
    """Возвращает список всех акций."""
    promotions = Promotion.query.all()
    return jsonify([promotion_to_dict(p) for p in promotions])


@api.route('/promotions/<int:id>', methods=['GET'])
def get_promotion(id):
    """Возвращает детальную информацию об одной акции по её ID."""
    promo = Promotion.query.get_or_404(id)
    return jsonify(promotion_to_dict(promo, is_detailed=True))