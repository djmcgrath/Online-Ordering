"""empty message

Revision ID: da2c25e324a7
Revises: 
Create Date: 2023-11-28 13:45:02.747033

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da2c25e324a7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customer_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_name', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ingredient_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ingredient_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menu_item_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('item_category', sa.String(), nullable=True),
    sa.Column('cost', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customer_table.id'], name=op.f('fk_cart_table_customer_id_customer_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menu_item_ingredients_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ingredient_id', sa.Integer(), nullable=True),
    sa.Column('menu_item_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredient_table.id'], name=op.f('fk_menu_item_ingredients_table_ingredient_id_ingredient_table')),
    sa.ForeignKeyConstraint(['menu_item_id'], ['menu_item_table.id'], name=op.f('fk_menu_item_ingredients_table_menu_item_id_menu_item_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_menu_item',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('menu_item_id', sa.Integer(), nullable=True),
    sa.Column('cart_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['cart_id'], ['cart_table.id'], name=op.f('fk_cart_menu_item_cart_id_cart_table')),
    sa.ForeignKeyConstraint(['menu_item_id'], ['menu_item_table.id'], name=op.f('fk_cart_menu_item_menu_item_id_menu_item_table')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cart_menu_item')
    op.drop_table('menu_item_ingredients_table')
    op.drop_table('cart_table')
    op.drop_table('menu_item_table')
    op.drop_table('ingredient_table')
    op.drop_table('customer_table')
    # ### end Alembic commands ###