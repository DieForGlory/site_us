# backend/routes.py
from flask import jsonify, Blueprint, url_for
from models import Project, Promotion, NewsItem
from extensions import db

api = Blueprint('api', __name__, url_prefix='/api')

def project_to_dict(project):
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

def news_item_to_dict(news_item):
    """Преобразует объект новости в словарь."""
    return {
        'id': news_item.id,
        'title': news_item.title,
        'description': news_item.description,
        'date': news_item.date,
        'img': url_for('static', filename=f'uploads/{news_item.image_url}', _external=True) if news_item.image_url else None
    }

@api.route('/news', methods=['GET'])
def get_news():
    """Отдает список всех новостей, отсортированных по ID в обратном порядке."""
    # .order_by(NewsItem.id.desc()) - чтобы новые были первыми
    # .limit(3) - чтобы брать только 3 последние новости для главной страницы
    news_items = NewsItem.query.order_by(NewsItem.id.desc()).limit(3).all()
    return jsonify([news_item_to_dict(n) for n in news_items])

def promotion_to_dict(promo, is_detailed=False):
    data = {
        'id': promo.id,
        'title': promo.title,
        'description': promo.description,
        'bg': url_for('static', filename=f'uploads/{promo.bg_image_url}', _external=True) if promo.bg_image_url else None,
        'expires_on': promo.expires_on
    }
    if is_detailed:
        data['detailed_description'] = promo.detailed_description
    return data

@api.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project_to_dict(p) for p in projects])

@api.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project_to_dict(project))

@api.route('/promotions', methods=['GET'])
def get_promotions():
    promotions = Promotion.query.all()
    return jsonify([promotion_to_dict(p) for p in promotions])

@api.route('/promotions/<int:id>', methods=['GET'])
def get_promotion(id):
    promo = Promotion.query.get_or_404(id)
    return jsonify(promotion_to_dict(promo, is_detailed=True))