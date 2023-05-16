require 'test_helper'

class StudyAssignmentTest < ActiveSupport::TestCase
  test 'Has a required fields - Active record' do
    study = StudyAssignment.new
    assert_not study.save
    assert_equal(["Group can't be blank", "Results can't be blank"], study.errors.to_a)
  end
  test 'Has a name - database' do
    study = StudyAssignment.new
    assert_raises(ActiveRecord::NotNullViolation) { study.save!(validate: false) }
  end
end
