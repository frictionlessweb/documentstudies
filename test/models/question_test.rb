require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  test 'Has instructions - database' do
    question = Question.new(name: 'test')
    assert_raises(ActiveRecord::NotNullViolation) do
      question.save!(validate: false)
    end
  end
  test 'Has instructions - ActiveRecord' do
    question = Question.new(name: 'test')
    assert_not question.save
    assert_equal("Instructions can't be blank", question.errors.to_a[0])
  end
  test 'Has a name - database' do
    question = Question.new(instructions: 'test')
    assert_raises(ActiveRecord::NotNullViolation) do
      question.save!(validate: false)
    end
  end
  test 'Has a name - ActiveRecord' do
    question = Question.new(instructions: 'test')
    assert_not question.save
    assert_equal("Name can't be blank", question.errors.to_a[0])
  end
  test 'Can have a question type' do
    question = Question.create(name: 'My favorite question.', instructions: 'test')
    free_question = FreeResponseQuestion.create(text: 'Example')
    question.update!(question_type: free_question)
    question.reload
    free_question.reload
    assert_equal(free_question, question.question_type)
    assert_equal(question, free_question.question)
  end
end
