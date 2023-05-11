class Question < ApplicationRecord
  validates :name, presence: true
  validates :instructions, presence: true
  belongs_to :question_type, polymorphic: true
end
