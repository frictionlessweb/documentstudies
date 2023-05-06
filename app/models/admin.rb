class Admin < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
end
