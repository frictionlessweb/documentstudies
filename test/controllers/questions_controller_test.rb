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
end
