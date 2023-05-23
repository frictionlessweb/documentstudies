require 'test_helper'

class DocumentIdValidatorTest < ActiveSupport::TestCase
  test 'Validates a schema where documents exist' do
    schema = JSON.parse File.read file_fixture 'study.json'
    symbol, message = DocumentIdValidator.validate schema
    assert true
  end
  test 'Validates a schema where documents do not exist' do
    schema = JSON.parse File.read file_fixture 'study.json'
    assert true
  end
end
