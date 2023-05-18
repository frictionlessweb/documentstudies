class Study < ApplicationRecord
  validates :schema, presence: true
  has_many :study_assignment, dependent: :destroy
end
