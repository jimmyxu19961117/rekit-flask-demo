from flask import Flask, request, render_template, flash, redirect, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
import json

pymysql.install_as_MySQLdb()

app = Flask(__name__, template_folder='../client', static_folder='../client', static_url_path='')
app.config.from_object(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1

class Config(object):
    user = 'root'
    password = 'jimmy1117'
    database = 'flask_ex'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%s:%s@127.0.0.1:3306/%s' % (user,password,database)

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config.from_object(Config)

db = SQLAlchemy(app)

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User',backref='role')

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    name = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64),unique=True)
    pswd = db.Column(db.String(64))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def index():
    return 'Welcome'

@app.route('/newuser', methods = ['POST'])
def insertNewUserData():
    data = request.get_json(force=True)
    name = data['name']
    email = data['email']
    pswd = data['pswd']
    role_id = 1
    if data['role'] == "user":
        role_id = 2
    new_user = User(name=name, email=email, pswd=pswd, role_id=role_id)
    db.session.add(new_user)
    try:
        db.session.commit()
        return json.dumps(data)
    except Exception as error:
        db.session.flush()
        db.session.rollback()
        print("THIS IS ERROR:")
        print(str(error))
        return str(error.orig), 500

@app.route("/user/home", methods=['Get', 'POST'])
def home():
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='jimmy1117', db='flask_ex')
    cursor = conn.cursor()
    cursor.execute("select * from users")
    row = cursor.fetchall()
    
    conn.commit()
    cursor.close()
    conn.close()

    data = []

    for res in row:
        subData = {'id': res[0], 'name': res[1], 'email': res[2], 'pswd': res[3], 'role_id': res[4]}
        data.append(subData)

    return json.dumps(data)


if __name__ == "__main__":
    db.drop_all()
    db.create_all()

    role1 = Role(name='admin')
    role2 = Role(name='user')
    db.session.add_all([role1,role2])
    db.session.commit()

    user1 = User(name='wang',email='wang@163.com',pswd='123456',role_id=role1.id)
    user2 = User(name='zhang',email='zhang@189.com',pswd='201512',role_id=role2.id)
    user3 = User(name='chen',email='chen@126.com',pswd='987654',role_id=role2.id)
    user4 = User(name='zhou',email='zhou@163.com',pswd='456789',role_id=role1.id)
    db.session.add_all([user1,user2,user3,user4])
    db.session.commit()

    app.run('127.0.0.1', debug=True, port=5001)