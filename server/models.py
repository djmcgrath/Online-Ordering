from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Models go here!
class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredient_table"
    id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String)
    # allergens = db.Column(db.String)
    menu_item_ingredients = db.relationship("MenuItemIngredient", back_populates="ingredient")
    @validates("ingredient_name")
    def validate_ingredient_name(self, key, ingredient_name):
        if not ingredient_name or len(ingredient_name) <= 1:
            raise ValueError("Ingredient name must be present and at least 2 characters long")
        return ingredient_name

    serialize_rules = ('-menu_item_ingredients.ingredient',)

    def __repr__(self):
        return f'<Ingredient {self.id}>'

class MenuItemIngredient(db.Model, SerializerMixin):
    __tablename__ = "menu_item_ingredients_table"
    id = db.Column(db.Integer, primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredient_table.id"), nullable=True)
    ingredient = db.relationship("Ingredient", back_populates="menu_item_ingredients")
    menu_item_id = db.Column(db.Integer, db.ForeignKey("menu_item_table.id"), nullable=True)
    menu_item = db.relationship("MenuItem", back_populates="menu_item_ingredients")

    serialize_rules = ('-ingredient.menu_item_ingredients', '-menu_item.menu_item_ingredients')


    def __repr__(self):
        return f'<MenuItemIngredient {self.id}>'

class MenuItem(db.Model, SerializerMixin):
    __tablename__= "menu_item_table"
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String)
    description = db.Column(db.String)
    menu_item_ingredients = db.relationship("MenuItemIngredient", back_populates="menu_item")
    cart_menu_item = db.relationship("CartMenuItem", back_populates="menu_item")
    cost = db.Column(db.Float)
    @validates("description")
    def validate_description(self, key, description):
        if not description or len(description) < 20 or not isinstance(description, str):
            raise ValueError("Description must be present and at least 20 characters long")
        return description

    serialize_rules = ('-menu_item_ingredients.menu_item', '-cart_menu_item.cart')

    def __repr__(self):
        return f'<MenuItem {self.id}>'

class CartMenuItem(db.Model, SerializerMixin):
    __tablename__= "cart_menu_item"
    id = db.Column(db.Integer, primary_key=True)
    menu_item_id = db.Column(db.Integer, db.ForeignKey("menu_item_table.id"), nullable=True)
    menu_item = db.relationship("MenuItem", back_populates="cart_menu_item")
    cart_id = db.Column(db.Integer, db.ForeignKey("cart_table.id"), nullable=True)
    cart = db.relationship("Cart", back_populates="cart_menu_item")

    serialize_rules = ('-menu_item.cart_menu_item', '-cart.cart_menu_item')

    def __repr__(self):
        return f'<CartMenuItem {self.id}>'

class Cart(db.Model, SerializerMixin):
    __tablename__= "cart_table"
    id = db.Column(db.Integer, primary_key=True)
    cart_menu_item = db.relationship("CartMenuItem", back_populates="cart")
    customer_id = db.Column(db.Integer, db.ForeignKey("customer_table.id"), nullable=True)
    customer = db.relationship("Customer", back_populates="cart")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ('-cart_menu_item.cart',)

    @validates("customer_id")
    def validate_customer_id (self, key, customerId):
        existing_cart = Cart.query.filter_by(customer_id = customerId).first()
        if existing_cart is not None:
            raise ValueError("Customer already has cart darlin (said in a southern accent)")
        return customerId

    def __repr__(self):
        return f'<Cart {self.id}>'

class Customer(db.Model, SerializerMixin):
    __tablename__= "customer_table"
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String)
    cart = db.relationship("Cart", back_populates="customer")
    # allergies = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ('-cart.customer',)

    def __repr__(self):
        return f'<Customer {self.id}>'