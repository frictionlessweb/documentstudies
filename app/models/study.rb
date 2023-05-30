class Study < ApplicationRecord
  validates :schema, presence: true
  has_many :study_assignment, dependent: :destroy
  validate :schema_is_valid

  def next_assignment
    groups = schema['groups']
    last_assignment_group = StudyAssignment.select(:group).where(study: self).order('created_at DESC')&.first&.group
    last_index = groups.find_index(last_assignment_group) || -1
    group = groups[(last_index + 1) % groups.length]
    StudyAssignment.create!(study: self, group:, results: schema)
  end

  def schema_is_valid
    symbol, message = DocumentIdValidator.validate schema
    if symbol.present? and message.present?
      errors.add(symbol, message)
    end
  end
end
