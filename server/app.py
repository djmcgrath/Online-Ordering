#!/usr/bin/env python3
from flask import Flask, abort, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

from models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

app.secret_key = b"\xb2\xc3vb\x1a\xd1\xe7 \xfdS\xda$'\x8e\xbc\xce"



# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.before_request
def check_if_logged_in():
    restricted_access_list = []
    if (request.endpoint) in restricted_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401


class Ingredients(Resource):
    def get(self):
        ingredients_list = [ingredients.to_dict(rules = ("-menu_item_ingredients",)) for ingredients in Ingredient.query.all()]
        return ingredients_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_ingredient = Ingredient(
                ingredient_name = data["ingredient_name"]
            )
            db.session.add(new_ingredient)
            db.session.commit()

            return new_ingredient.to_dict(rules = ("-menu_item_ingredients",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400

api.add_resource(Ingredients, "/ingredients")

class IngredientById(Resource):
    def get(self, id):
        ingredient = Ingredient.query.filter_by(id = id).first()
        if not ingredient:
            return {"error": "Ingredient not found"}, 404
        return ingredient.to_dict(rules = ("-menu_item_ingredients",)), 200

api.add_resource(IngredientById, "/ingredients/<int:id>")

class MenuItems(Resource):
    def get(self):
        menu_item_list = [menu_item.to_dict(rules = ("-cart_menu_item",)) for menu_item in MenuItem.query.all()]
        return menu_item_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_menu_item = MenuItem(
                item_name = data["item_name"],
                description = data["description"],
                image = data["image"],
                item_category = data["item_category"],
                cost = data["cost"]
            )
            db.session.add(new_menu_item)
            db.session.commit()
            return new_menu_item.to_dict(rules = ("-cart_menu_item",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        

api.add_resource(MenuItems, "/menuitems")

class MenuItemById(Resource):
    def get(self, id):
        menu_item = MenuItem.query.filter_by(id = id).first()
        if not menu_item:
            return {"error": "menu item not found"}, 404
        return menu_item.to_dict(rules = ("-cart_menu_item",)), 200
    
    def delete(self, id):
        menu_item = MenuItem.query.filter_by(id = id).first()
        if not menu_item:
            return {"error": "menu item not found"}, 404
        db.session.delete(menu_item)
        db.session.commit()

        return "", 204

api.add_resource(MenuItemById, "/menuitems/<int:id>")

class Carts(Resource):
    def get(self):
        carts_list = [carts.to_dict(rules = ("-customer",)) for carts in Cart.query.all()]
        return carts_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_cart = Cart(
                customer_id = data["customer_id"]
            )
            db.session.add(new_cart)
            db.session.commit()
            return new_cart.to_dict(rules = ("-customer",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400

api.add_resource(Carts, "/carts")

class CartById(Resource):
    def get(self, id):
        cart = Cart.query.filter_by(id = id).first()
        if not cart:
            return {"error": "Cart not found"}, 404
        return cart.to_dict(rules = ("-customer",)), 200
    
    def patch(self, id):
        cart = Cart.query.filter_by(id = id).first()
        if not cart:
            return {"error": "cart not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(cart, key, data[key])
            db.session.commit()
            return cart.to_dict(rules = ("-customer",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400

    def delete(self, id):
        cart = Cart.query.filter_by(id = id).first()
        if not cart:
            return {"error": "Cart not found"}, 404
        db.session.delete(cart)
        db.session.commit()

        return "", 204


api.add_resource(CartById, "/carts/<int:id>")

class CartMenuItems(Resource):
    def get(self):
        cart_menu_list = [cart_menu.to_dict(rules = ("-cart.customer",)) for cart_menu in CartMenuItem.query.all()]
        return cart_menu_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_cart_menu_item = CartMenuItem(
                menu_item_id = data["menu_item_id"],
                quantity = data["quantity"],
                cart_id = data["cart_id"]
            )
            db.session.add(new_cart_menu_item)
            db.session.commit()
            return new_cart_menu_item.to_dict(rules = ("-cart.customer",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        
api.add_resource(CartMenuItems, "/cartmenuitems")
    

class CartMenuItemByID(Resource):
    def get(self, id):
        cartMenuItem = CartMenuItem.query.filter_by(id = id).first()
        if not cartMenuItem:
            return {"error": "Cart not found"}, 404
        return cartMenuItem.to_dict(rules = ("-customer",)), 200
    
    def patch(self, id):
        cartMenuItem = CartMenuItem.query.filter_by(id = id).first()
        if not cartMenuItem:
            return {"error": "cart not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(cartMenuItem, key, data[key])
            db.session.commit()
            return cartMenuItem.to_dict(rules = ("-customer",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400

    def delete(self, id):
        cartMenuItem = CartMenuItem.query.filter_by(id = id).first()
        if not cartMenuItem:
            return {"error": "Cart not found"}, 404
        db.session.delete(cartMenuItem)
        db.session.commit()

        return "", 204
    
api.add_resource(CartMenuItemByID, "/cartmenuitems/<int:id>")

class Customers(Resource):
    def get(self):
        customers_list = [customers.to_dict(rules =("-_password_hash", "-cart.cart_menu_item")) for customers in Customer.query.all()]
        return customers_list, 200



api.add_resource(Customers, "/customers")

class CustomerById(Resource):
    def get(self, id):
        customer = Customer.query.filter_by(id = id).first()
        if not customer:
            return {"error": "Customer not found"}, 404
        return customer.to_dict(rules = ("-cart",)), 200
    
    def delete(self, id):
        customer = Customer.query.filter_by(id = id).first()
        if not customer:
            return {"error": "Customer not found"}, 404
        db.session.delete(customer)
        db.session.commit()
        
        return "", 204

    def patch(self, id):
        customer = Customer.query.filter_by(id = id).first()
        if not customer:
            return {"error": "Customer not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(customer, key, data[key])
            db.session.commit()
            return customer.to_dict(rules = ("-cart",)), 200
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400

api.add_resource(CustomerById, "/customers/<int:id>")

# Authorization----------------------------------------------------------------------
class CustomerSignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        customer_name = data.get("customer_name")
        try:
            new_user = Customer(
                username = username,
                email = email,
                customer_name = customer_name
                )
            try:
                print("Trying hash")
                new_user.password_hash = password
                print("Adding user to session...")
                db.session.add(new_user)
                print("Commiting session...")
                print(new_user)
                db.session.commit()

                session['user_id'] = new_user.id

                return new_user.to_dict(rules = ("-cart",)), 200
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400

api.add_resource(CustomerSignUp, "/signup")

class CheckSession(Resource):
    def get(self):
        
        user_id = session.get('user_id')
        if user_id:
            user = Customer.query.filter(Customer.id == user_id).first()
            return user.to_dict(rules = ("-cart", )), 200
        
        return {}, 401

api.add_resource(CheckSession, "/checksession")

class Login(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        email = request_json.get('email')
        password = request_json.get('password')
        if email:
            user = Customer.query.filter(Customer.email == email).first()
        if username:
            user = Customer.query.filter(Customer.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(rules = ("-cart", )), 200
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Login, "/login")

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, "/logout")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

