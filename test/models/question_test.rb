require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  test 'Has a name - database' do
    question = Question.new
    assert_raises(ActiveRecord::NotNullViolation) do
      question.save!(validate: false)
    end
  end
  test 'Has a name - ActiveRecord' do
    question = Question.new
    assert_not question.save
    assert_equal("Name can't be blank", question.errors.to_a[0])
  end
end
