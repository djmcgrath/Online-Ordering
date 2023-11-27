#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

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
    for _ in range(20):
        m = MenuItem(
            item_name = fake.dish(),
            description = fake.dish_description(),
            cost = round(random.uniform(4.20, 69.69), 2)
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

        print("Done seeding!")