from app import db


# The Model is created for Table based on the Table Structure
class CountyPopulation(db.Model):
    __tablename__ = "countypopulation"
    id = db.Column(db.Integer, primary_key=True)
    zipCode = db.Column(db.Integer, nullable=False, unique=True)
    county = db.Column(db.String(200), nullable=False)
    population = db.Column(db.Integer, nullable=False)

    def __repr__(self) -> str:
        return '<ZipCode %r>' % self.county
