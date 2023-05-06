require "test_helper"

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  test "Uploading files works" do
    the_path = api_v1_upload_file_path
    post api_v1_upload_file_path
    assert_response :redirect
  end
end
