ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # def log_in(options = { email: 'susan@testing.com', password: '123greetings' })
  #   post admin_session_path, params: {  email: options[:email],
  #                                       password: options[:password],
  #                                       remember_me: true }
  #   assert_response :success
  # end
end
