# -*- coding: utf-8 -*-

from flask import abort
from flask import render_template
from flask import Response
from flask import session

from flask_restful import Resource
from flask_restful import fields
from flask_restful import marshal
from flask_restful import reqparse

from ..models import User, Admin
from ..models import db
from ..auth import auth
from ..utils import request_json
from ..fields import user_fields


class UserAPI(Resource):
    #decorators = [auth.login_required]
    def __init__(self):
        self.rp = reqparse.RequestParser()
        self.rp.add_argument('name', type=str, location='json')
        self.rp.add_argument('password', type=str, location='json')
        self.rp.add_argument('description', type=str, location='json')
        self.rp.add_argument('container_id', type=str, location='json')
        self.rp.add_argument('container_name', type=str, location='json')
        self.rp.add_argument('server_url', type=str, location='json')
        super(UserAPI, self).__init__()

    def get(self, name):
        user = User.query.filter(User.name==name).first()
        if user is None:
            abort(404)

        if request_json():
            return {'user': marshal(user, user_fields)}
        return Response(
                    render_template('show_user.html',
                        user=marshal(user, user_fields),
                        title="Inspection of {}".format(name)),
                    mimetype='text/html')
    
    #@auth.login_required
    def put(self, name):
        # todo: handle admin?
        user = User.query.filter(User.name==name).first()
        if user is None:
            abort(404)
        args = self.rp.parse_args()
        for k, v in args.items():
            if k == 'password' and v not in [None, '']:
                user.hash_password(v)
            if v is not None:
                setattr(user, k, v)

        db.session.commit()
        return {'user': marshal(user, user_fields)}

    #@auth.login_required
    def delete(self, name):
        user = User.query.filter(User.name==name).first()
        if user is None:
            abort(404)
        db.session.delete(user)
        db.session.commit()
        return {'result': True}


class UserListAPI(Resource):
    #decorators = [auth.login_required]
    def __init__(self):
        self.rp = reqparse.RequestParser()
        self.rp.add_argument('username', type=str, required=True,
                help='No username provided', location='json')
        self.rp.add_argument('password', type=str, required=True,
                help='No password provided', location='json')
        self.rp.add_argument('description', type=str, default='TBA',
                location='json')
        super(UserListAPI, self).__init__()

    def get(self):
        users = User.query.all()
        if request_json():
            return {'users': [marshal(u, user_fields) for u in users]}
        return Response(
                    render_template('show_users.html',
                        users=[marshal(u, user_fields) for u in users]),
                        mimetype='text/html')

    #@auth.login_required
    def post(self):
        user = self.rp.parse_args()
        username = user.get('username')
        password = user.get('password')

        if username is None or username == '':
            return {'error': 'Invalid username'}, 400
        if password is None or password == '':
            return {'error': 'Invalid password'}, 400

        u = User.query.filter(User.name==username).first()
        if u is not None:
            return {'error': 'user exists'}, 400
        else:
            if 'logged_in_admin' in session:
                admin_name = session['logged_in_admin']
                admin = Admin.query.filter_by(nickname==admin_name).first()
            else:
                admin = Admin.query.filter_by(id=1).first()
                
            new_u = User(name=username, 
                         admin=admin,
                         description=user.get('description'),
                    )
            new_u.hash_password(user.get('password'))
            db.session.add(new_u)
            db.session.commit()
            return {'user': marshal(new_u, user_fields)}, 201