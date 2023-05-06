class Document < ApplicationRecord
  validates :name, presence: true
  has_one_attached :file
end
