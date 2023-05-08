class Question < ApplicationRecord
  validates :name, presence: true
  has_one :question_type, as: :question_type
end
