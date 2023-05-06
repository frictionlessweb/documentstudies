require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'We can get the root route' do
    get '/'
    assert_response :success
  end
  test 'When we get the root route without logging in, data-admin-name is empty' do
    get '/'
    assert_select "body[data-admin-name='']"
  end
  test 'When we get the root route after logging in, data-admin-name is not empty' do
    sign_in Admin.find_by(name: 'Susan')
    get '/'
    assert_select "body[data-admin-name='Susan']"
  end
end
