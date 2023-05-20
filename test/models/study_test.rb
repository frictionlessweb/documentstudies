require 'test_helper'

class StudyTest < ActiveSupport::TestCase
  test 'Has a schema - Active record' do
    study = Study.new
    assert_not study.save
    assert_equal("Schema can't be blank", study.errors.to_a[0])
  end
  test 'Has a name - database' do
    study = Study.new
    assert_raises(ActiveRecord::NotNullViolation) { study.save!(validate: false) }
  end
  test 'Next assignment works with 1 group' do
    study = Study.create!(schema: { groups: ['Group 1'] })
    assignment_one = study.next_assignment
    assignment_two = study.next_assignment
    assignment_three = study.next_assignment
    assignment_four = study.next_assignment
    assert_equal('Group 1', assignment_one.group)
    assert_equal('Group 1', assignment_two.group)
    assert_equal('Group 1', assignment_three.group)
    assert_equal('Group 1', assignment_four.group)
  end
  test 'Next assignment works with 3 groups' do
    study = Study.create!(schema: { groups: ['Group 1', 'Group 2', 'Group 3'] })
    assignment_one = study.next_assignment
    assignment_two = study.next_assignment
    assignment_three = study.next_assignment
    assignment_four = study.next_assignment
    assignment_five = study.next_assignment
    assignment_six = study.next_assignment
    assert_equal('Group 1', assignment_one.group)
    assert_equal('Group 2', assignment_two.group)
    assert_equal('Group 3', assignment_three.group)
    assert_equal('Group 1', assignment_four.group)
    assert_equal('Group 2', assignment_five.group)
    assert_equal('Group 3', assignment_six.group)
  end
end
