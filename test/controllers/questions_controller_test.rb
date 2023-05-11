require 'test_helper'

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'Creating questions does not work if you are not logged in' do
    post api_v1_create_questions_path
    assert_response :redirect
  end
  test 'A user can create a free response question' do
    sign_in Admin.find_by(name: 'Susan')
    post api_v1_create_questions_path, params: {
      questions: [
        {
          name: 'First Question',
          instructions: 'test',
          question_type: {
            kind: 'FreeResponseQuestion',
            text: 'My new text'
          }
        }
      ]
    }, as: :json
    assert_response :success
    assert Question.find_by(name: 'First Question')
    assert FreeResponseQuestion.find_by(text: 'My new text')
  end

  test 'A user can read all of the questions in the system' do
    sign_in Admin.find_by(name: 'Susan')
    post api_v1_create_questions_path, params: {
      questions: [
        {
          name: 'First Question',
          instructions: 'test',
          question_type: {
            kind: 'FreeResponseQuestion',
            text: 'My new text'
          }
        }
      ]
    }, as: :json
    assert_response :success
    get api_v1_all_questions_path
    assert_response :success
    parsed_body = JSON.parse @response.body
    assert_equal(1, parsed_body.length)
    question = Question.find_by(name: 'First Question')
    assert_equal(question.id.to_s, parsed_body[0]['id'])
  end
end
