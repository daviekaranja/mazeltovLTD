"""trancking bingwa offers

Revision ID: 4f5d05c33349
Revises: 
Create Date: 2025-05-26 13:59:08.764846

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '4f5d05c33349'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bingwaoffer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('validity', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('category', sa.Enum('data', 'sms', 'minutes', 'minutes_plus_data', name='offercategory'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('securitycode',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('code', sa.Integer(), nullable=False),
    sa.Column('expires', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('code')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=False),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
    sa.Column('hashed_password', sqlmodel.sql.sqltypes.AutoString(length=300), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('super_user', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('mpesatransaction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('merchant_request_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('checkout_request_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('status', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('mpesa_receipt_number', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('receiving_number', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('paying_number', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('offer_id', sa.Integer(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('transaction_date', sa.DateTime(), nullable=False),
    sa.Column('result_code', sa.Integer(), nullable=False),
    sa.Column('result_desc', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['offer_id'], ['bingwaoffer.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_mpesatransaction_checkout_request_id'), 'mpesatransaction', ['checkout_request_id'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_created_at'), 'mpesatransaction', ['created_at'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_merchant_request_id'), 'mpesatransaction', ['merchant_request_id'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_mpesa_receipt_number'), 'mpesatransaction', ['mpesa_receipt_number'], unique=True)
    op.create_index(op.f('ix_mpesatransaction_paying_number'), 'mpesatransaction', ['paying_number'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_receiving_number'), 'mpesatransaction', ['receiving_number'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_result_code'), 'mpesatransaction', ['result_code'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_status'), 'mpesatransaction', ['status'], unique=False)
    op.create_index(op.f('ix_mpesatransaction_updated_at'), 'mpesatransaction', ['updated_at'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_mpesatransaction_updated_at'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_status'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_result_code'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_receiving_number'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_paying_number'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_mpesa_receipt_number'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_merchant_request_id'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_created_at'), table_name='mpesatransaction')
    op.drop_index(op.f('ix_mpesatransaction_checkout_request_id'), table_name='mpesatransaction')
    op.drop_table('mpesatransaction')
    op.drop_table('user')
    op.drop_table('securitycode')
    op.drop_table('bingwaoffer')
    # ### end Alembic commands ###
