require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "If we aren't logged in, we get redirected to the login route" do
    get "/"
    assert_response :success
  end
end
