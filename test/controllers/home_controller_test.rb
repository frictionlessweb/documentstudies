require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "We can go home" do
    get "/"
    assert_response :success
  end
end
