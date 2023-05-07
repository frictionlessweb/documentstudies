require 'test_helper'

class AdminControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'When we get the root route without logging in, data-admin-name is empty' do
    get '/admins'
    assert_select "body[data-admin-name='']"
  end
  test 'When we get the root route after logging in, data-admin-name is not empty' do
    sign_in Admin.find_by(name: 'Susan')
    get '/admins'
    assert_select "body[data-admin-name='Susan']"
  end
end
