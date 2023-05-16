class Document < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_one_attached :file
end
