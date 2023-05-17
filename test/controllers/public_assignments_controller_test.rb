require 'test_helper'

class PublicAssignmentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'We can update a study' do
    susan = Admin.find_by(name: 'Susan')
    sign_in susan
    post '/api/v1/create-study', params: { schema: { x: 3 } }
    study_id = (JSON.parse @response.body)["id"]
    post '/api/v1/create-study-assignment', params: { study_id: study_id, group: 'test', schema: { x: 4 }, }
    assignment_id = (JSON.parse @response.body)["id"]
    sign_out susan
    put '/api/v1/update-assignment', params: { assignment_id: assignment_id, results: { x: 5 } }
    assert_response :success
    assert_equal({"x" => "5"}, (JSON.parse @response.body)["results"])
  end
end
