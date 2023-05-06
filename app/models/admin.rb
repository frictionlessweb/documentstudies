class Admin < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  has_secure_password
end
