require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test 'We can get the root route' do
    get '/'
    assert_response :success
  end
end
