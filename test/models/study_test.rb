require "test_helper"

class StudyTest < ActiveSupport::TestCase
  test "Has a schema - Active record" do
    study = Study.new
    assert_not study.save
    assert_equal("Schema can't be blank", study.errors.to_a[0])
  end
  test 'Has a name - database' do
    study = Study.new
    assert_raises(ActiveRecord::NotNullViolation) { study.save!(validate: false) }
  end
end
