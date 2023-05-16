require 'test_helper'

class AdminControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'We can create a study' do
    sign_in Admin.find_by(name: 'Susan')
    post '/api/v1/create-study', params: { schema: { x: 3 } }
    assert_response :success
  end
end
