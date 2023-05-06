require "test_helper"

class AdminTest < ActiveSupport::TestCase
  test "Has an email - database" do
    admin = Admin.new(name: 'Joe', password: '123456')
    assert_raises(ActiveRecord::NotNullViolation) do
      admin.save!(validate: false)
    end
  end
  test "Has an email - ActiveRecord" do
    admin = Admin.new(name: 'Joe', password: '123456')
    assert_not admin.save
    assert_equal("Email can't be blank", admin.errors.to_a[0])
  end
  test "Has a name - database" do
    admin = Admin.new(email: 'joe@adobe.com', password: '123456')
    assert_raises(ActiveRecord::NotNullViolation) do
      admin.save!(validate: false)
    end
  end
  test "Has a name - ActiveRecord" do
    admin = Admin.new(email: 'joe@adobe.com', password: '123456')
    assert_not admin.save
    assert_equal("Name can't be blank", admin.errors.to_a[0])
  end
  test "Has a password - database" do
    admin = Admin.new(name: 'joe', email: 'joe@adobe.com')
    assert_raises(ActiveRecord::NotNullViolation) do
      admin.save!(validate: false)
    end
  end
  test "Has a password - ActiveRecord" do
    admin = Admin.new(name: 'joe', email: 'joe@adobe.com')
    assert_not admin.save
    assert_equal("Password can't be blank", admin.errors.to_a[0])
  end
  test 'Emails are unique - database' do
    admin = Admin.create!(name: 'joe', email: 'joe@adobe.com', password: '123456')
    duplicate = Admin.new(name: 'joe', email: 'joe@adobe.com', password: '123456')
    assert_raises(ActiveRecord::RecordNotUnique) do
      duplicate.save!(validate: false)
    end
  end
  test 'Emails are unique - ActiveRecord' do
    admin = Admin.create!(name: 'joe', email: 'joe@adobe.com', password: '123456')
    duplicate = Admin.new(name: 'joe', email: 'joe@adobe.com', password: '123456')
    assert_not duplicate.save
    assert_equal('Email has already been taken', duplicate.errors.to_a[0])
  end
end
