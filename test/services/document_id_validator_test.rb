require 'test_helper'

class DocumentIdValidatorTest < ActiveSupport::TestCase
  test 'Validates a schema where documents exist' do
    schema = JSON.parse File.read file_fixture 'study.json'
    names = ['DR--1015587.pdf', 'E0CEG1S47.pdf']
    names.each do |name|
      Document.create!(name: name)
    end
    symbol, message = DocumentIdValidator.validate schema
    assert_nil symbol
    assert_nil message
  end
  test 'Validates a schema where documents do not exist' do
    schema = JSON.parse File.read file_fixture 'study.json'
    symbol, message = DocumentIdValidator.validate schema
    assert_equal(:missing_document_id, symbol)
  end
end
