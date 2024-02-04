from flask import Flask,request,jsonify,send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///user.db'
base_path = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(base_path, 'static', 'uploads')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db=SQLAlchemy(app)
class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    password=db.Column(db.String(100),nullable=False)
    avatar=db.Column(db.String(100),nullable=True)
    time=db.Column(db.DateTime,default=datetime.utcnow)

with app.app_context():
    db.create_all() 

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def handle_post_request():
    if 'image' in request.files:
        file = request.files['image']
        if file.filename != '':
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            return file.filename
    return 'No file selected for upload'

@app.route('/login',methods=['POST'])
def login():
    data = request.json  
    new_user = User(name=data['name'], password=data['password'], avatar=data['avatar'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Success'})


@app.route('/getAll',methods=['GET'])
def getAll():
    all_users = User.query.all()
    users_list = [{'id': user.id, 'name': user.name, 'password': user.password, 'avatar': user.avatar, 'time': str(user.time)} for user in all_users]
    return jsonify(users_list)

@app.route('/getOneUser',methods=['POST'])
def getOne():
    idUser = request.json
    data = idUser.get('id')
    user = User.query.get_or_404(data)
    return jsonify({'pass': user.password, 'name': user.name,'avatar':user.avatar,'id':user.id})

@app.route('/update',methods=['POST'])
def update():
    idUser = request.json
    user = User.query.get_or_404(idUser['id'])
    if user:
        user.name = idUser['name']
        user.password = idUser['pass']
        db.session.commit()
    else:
        return 'error'
    
    return jsonify({'pass': 123})
CORS(app, origins='http://localhost:3000', headers=['Content-Type'])

if __name__ == "__main__":
    app.run(debug=True)