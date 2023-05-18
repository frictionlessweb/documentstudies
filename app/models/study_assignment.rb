class StudyAssignment < ApplicationRecord
  validates :group, presence: true
  validates :results, presence: true
  belongs_to :study
end
