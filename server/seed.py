#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random
import pandas as pd

# Load the CSV data into a DataFrame
food_menu_items = pd.read_csv("CSV_Data/Food_Menu_Items.csv")
print(food_menu_items)

# Remote library imports
from faker import Faker
from faker_food import FoodProvider

# Local imports
from app import app
from models import *

fake = Faker()
fake.add_provider(FoodProvider)

def seed_ingredients():
    ingredients = []
    for _ in range(50):
        i = Ingredient(
            ingredient_name = fake.ingredient()
        )
        ingredients.append(i)
    return ingredients

def seed_menu_items():
    menu_items = []
    for index, row in food_menu_items.iterrows():
        m = MenuItem(
            item_name = row["item_name"],
            description = row["description"],
            item_category = row["item_category"],
            # image = row["image"],
            cost = row["cost"]
        )
        menu_items.append(m)
    return menu_items

def seed_customers():
    customers = []
    for _ in range(10):
        c = Customer(
            customer_name=fake.name(),
        )
        customers.append(c)
    return customers

def seed_cart():
    carts = []
    cart = Cart(
        customer_id = 1
    )
    carts.append(cart)
    return carts


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        try:
            Ingredient.query.delete()
        except:
            print("No Ingredient")
        try:
            MenuItem.query.delete()
        except:
            print("No MenuItems")
        try:
            Customer.query.delete()
        except:
            print("No Customers")
        try:
            Cart.query.delete()
        except:
            print("No Carts")

        # Seed code goes here!
        print("Seeding ingredients...")
        ingredients = seed_ingredients()
        db.session.add_all(ingredients)
        db.session.commit()

        print("Seeding menu_items...")
        menu_items = seed_menu_items()
        db.session.add_all(menu_items)
        db.session.commit()

        print("Seeding customers...")
        customers = seed_customers()
        db.session.add_all(customers)
        db.session.commit()

        print("Seeding cart...")
        carts = seed_cart()
        db.session.add_all(carts)
        db.session.commit()
        print("Done seeding!")