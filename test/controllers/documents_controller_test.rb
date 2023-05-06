require 'test_helper'

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'Uploading files does not work if you are not logged in' do
    post api_v1_upload_file_path
    assert_response :redirect
  end
  test 'Uploading files does work if you are logged in' do
    sign_in Admin.find_by(name: 'Susan')
    post api_v1_upload_file_path
    assert_response :success
  end
end
