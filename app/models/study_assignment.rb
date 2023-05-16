class StudyAssignment < ApplicationRecord
  validates :group, presence: true
  validates :results, presence: true
end
