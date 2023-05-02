require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "user default role is :participant" do
    user = User.create(name: 'Joe', email: 'test@test.com')
    assert user.role == 'participant'
  end
  test "user cannot be created without name - active record" do
    user = User.new(email: 'test@test.com')
    assert_not user.save
    assert_equal("Name can't be blank", user.errors.to_a[0])
  end
  test 'user cannot be created without name - database' do
    user = User.new(email: 'test@test.com')
    assert_raises(ActiveRecord::NotNullViolation) { user.save!(validate: false) }
  end
  test "user cannot be created without email - active record" do
    user = User.new(name: 'Joe')
    assert_not user.save
    assert_equal("Email can't be blank", user.errors.to_a[0])
  end
  test 'user cannot be created without email - database' do
    user = User.new(name: 'Joe')
    assert_raises(ActiveRecord::NotNullViolation) { user.save!(validate: false) }
  end
end
