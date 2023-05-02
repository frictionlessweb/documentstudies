class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  enum :role, [:participant, :admin]
  has_secure_password
end
