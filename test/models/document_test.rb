require "test_helper"

class DocumentTest < ActiveSupport::TestCase
  test "Has a name - ActiveRecord" do
    doc = Document.new
    doc.save
    assert_equal("Name can't be blank", doc.errors.to_a[0])
  end
  test 'Has a name - database' do
    doc = Document.new
    assert_raises(ActiveRecord::NotNullViolation) { doc.save!(validate: false) }
  end
end
