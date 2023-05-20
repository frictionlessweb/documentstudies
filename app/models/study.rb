class Study < ApplicationRecord
  validates :schema, presence: true
  has_many :study_assignment, dependent: :destroy

  def next_assignment
    groups = schema['groups']
    last_assignment_group = StudyAssignment.select(:group).where(study:).order('created_at DESC').first.group
    last_index = groups.find_index(last_assignment_group) || 0
    group = groups[(last_index + 1) % groups.length]
    StudyAssignment.create!(study:, group:, results: schema)
  end
end
