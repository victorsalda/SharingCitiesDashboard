from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.exc import IntegrityError

from db import db


class WidgetModel(db.Model):
    """ Database model for the widget table used to persist widget data
                :param _WIDGET_DB_TABLE_NAME: table name
                :param  id:         primary key
                :param  user_id:    users unique identification number
                :param  data:       widget data to be persisted in table

                :type _WIDGET_DB_TABLE_NAME: String
                :type id:       Integer
                :type user_id:  Integer
                :type data:     JSON

            """
    _WIDGET_DB_TABLE_NAME = 'widgets'

    __tablename__ = _WIDGET_DB_TABLE_NAME

    id = db.Column('id', db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, nullable=False)
    data = db.Column('data', JSON, nullable=False)

    layout_id = db.Column(db.Integer, db.ForeignKey('layouts.id'))
    #TODO: Change lazy loading to joined query loading for production
    layout = db.relationship('Layouts', backref=db.backref('layouts', lazy=True))

    def __init__(self, user_id, layout, data):
        self.user_id = user_id
        self.data = data
        self.layout = layout

        # Does the database table exist?
        self.create_table()

    def __str__(self):
        return "UserID: {} \t\tWidgetID: {}".format(self.user_id,self.id)

    def json(self):
        """
            formats response to be sent to user

        :return:  a Dictionary of the response data
                            :param  id:      widgetID
                            :param  userID:  users identification number
                            :param  data:    widget JSON data
                            :type   Integer:
                            :type   Integer:
                            :type   JSON:
        :rtype:   <class 'dict'>
        """
        # format response
        response_data = {"id": str(self.id), "userID": self.user_id, "data": self.data}
        return response_data

    def save(self):
        """
            Adds widget instance to the database session to be committed

            :raises IntegrityError:
            
        :return:
        """
        try:
            db.session.add(self)
            db.session.flush()
        except IntegrityError as ie:
            db.session.rollback()

    def delete(self):
        try:
            db.session.delete(self.layout)
            db.session.delete(self)
        except IntegrityError as ie:
            db.session.rollback()

    def commit(self):
        db.session.commit()

    def create_table(self):
        # If table don't exist, Create.
        if not self.table_exists():
            # Create a table with the appropriate Columns
            db.Table(self._WIDGET_DB_TABLE_NAME, db.MetaData(bind=db.engine),
                     db.Column('id', db.Integer, primary_key=True),
                     db.Column('user_id', db.Integer, nullable=False),
                     db.Column('data', JSON, nullable=False),
                     db.Column('layout_id',db.Integer, db.ForeignKey('layouts.id')),
                     db.relationship('Layouts', backref=db.backref('layouts', lazy=True)),
                     schema=None).create()

    def table_exists(self):
        """
            Check if table exists

            :return: True if the table exists in the database otherwise False
            :rtype: Boolean

        """
        # Does the table exist?
        has_table = db.engine.dialect.has_table(db.engine, self._WIDGET_DB_TABLE_NAME)
        return has_table

    @classmethod
    def get_widget_by_id(cls,widgetID):

        return cls.query.filter_by(id=widgetID).first()
    #.options(joinedload('layouts'))

