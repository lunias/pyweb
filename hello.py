from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://developer:jigsaw@localhost/jmineops_chug'
db = SQLAlchemy(app)

@app.route('/hi')
def hello_world():
    return 'Hello World!'

@app.route('/bye')
def goodbye_world():
    return 'Goodbye World!'

@app.route('/')
def show_entries():
    entries = Devices.query.order_by('name asc').all()
    return render_template('show_entries.html', entries=entries)

class Devices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    updated_at = db.Column(db.DateTime)
    installed_version = db.Column(db.String(50))

    group_id = db.Column(db.String(50), db.ForeignKey('devices.id'))
    group = db.relationship('Devices', remote_side=[id])

    def __init__(self, name):
        self.name = name
        self.updated_at = datetime.utcnow()

    def __repr__(self):
        return '<Device %r>' % self.name

class Enum_Tables(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Enum %r>' % self.name

if __name__ == '__main__':
    app.run(debug=True)


