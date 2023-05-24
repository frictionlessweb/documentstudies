require 'test_helper'

class PublicAssignmentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'We can get a study by name' do
    susan = Admin.find_by(name: 'Susan')
    sign_in susan
    post '/api/v1/create-study', params: { schema: { x: 3 } }
    study_id = (JSON.parse @response.body)['id']
    sign_out susan
    get '/api/v1/study-by-id', params: { study_id: }
    assert_response :success
    assert_equal study_id, (JSON.parse @response.body)['id']
  end

  test 'We can update a study' do
    susan = Admin.find_by(name: 'Susan')
    sign_in susan
    post '/api/v1/create-study', params: { schema: { x: 3 } }
    study_id = (JSON.parse @response.body)['id']
    post '/api/v1/create-study-assignment', params: { study_id:, group: 'test', schema: { x: 4 } }
    assignment_id = (JSON.parse @response.body)['id']
    sign_out susan
    put '/api/v1/update-assignment', params: { assignment_id:, results: { x: 5 } }
    assert_response :success
    assert_equal({ 'x' => '5' }, (JSON.parse @response.body)['results'])
    assert_equal(true, (JSON.parse @response.body)["is_complete"])
  end

  test 'We can have a user finish a study and then get all the data for the study' do
    susan = Admin.find_by(name: 'Susan')
    sign_in susan
    post '/api/v1/create-study', params: { schema: { x: 3 } }
    study_id = (JSON.parse @response.body)['id']
    post '/api/v1/create-study-assignment', params: { study_id:, group: 'test', schema: { x: 4 } }
    assignment_id = (JSON.parse @response.body)['id']
    sign_out susan
    put '/api/v1/update-assignment', params: { assignment_id:, results: { x: 5 } }
    sign_in susan
    get "/api/v1/completed-for-study?study_id=#{study_id}"
    assert_response :success
    assert_equal(1, (JSON.parse @response.body).length)
  end

  test 'We can get a document using its name' do
    ActiveStorage::Current.url_options = { host: 'https://www.example.com' }

    susan = Admin.find_by(name: 'Susan')
    sign_in susan
    post api_v1_create_document_path, params: {
      name: 'Test.pdf',
      file: fixture_file_upload('Test.pdf', 'application/pdf')
    }
    sign_out susan
    get '/api/v1/document-by-name', params: { document_name: 'Test.pdf' }
    assert (JSON.parse @response.body)['url'].starts_with?('http://')
  end
end
