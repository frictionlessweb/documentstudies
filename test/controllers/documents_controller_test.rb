require 'test_helper'

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'Uploading files does not work if you are not logged in' do
    post api_v1_create_document_path
    assert_response :redirect
  end
  test 'Uploading files does work if you are logged in' do
    sign_in Admin.find_by(name: 'Susan')
    post api_v1_create_document_path, params: {
      document: {
        name: 'Test.pdf',
        file: fixture_file_upload('Test.pdf', 'application/pdf')
      }
    }
    assert_response :success
    the_document = Document.find_by(name: 'Test.pdf')
    assert_equal('Test.pdf', the_document.name)
    assert_equal('Test.pdf', the_document.file.filename.to_s)
    parsed_body = JSON.parse(@response.body)
    assert_equal('Test.pdf', parsed_body['name'])
    assert_equal(the_document.id.to_s, parsed_body['id'])
    assert parsed_body['url'].starts_with?('http://')
  end
  test 'Getting every document does not work if you are not logged in' do
    get api_v1_all_documents_path
    assert_response :redirect
  end
  test 'Getting every document does work if you are logged in' do
    sign_in Admin.find_by(name: 'Susan')

    # Upload Document1 and Document2
    ['Document1.pdf', 'Document2.pdf'].each do |name|
      post api_v1_create_document_path, params: {
        document: {
          name:,
          file: fixture_file_upload('Test.pdf', 'application/pdf')
        }
      }
      assert_response :success
    end

    document_1 = Document.find_by(name: 'Document1.pdf')
    get api_v1_all_documents_path
    assert_response :success
    parsed = JSON.parse @response.body
    sorted = parsed.sort_by { |x| x['name'] }
    assert_equal('Document1.pdf', sorted[0]['name'])
    assert_equal(document_1.id.to_s, sorted[0]['id'])
    assert sorted[0]['url'].starts_with?('http://')
  end
end
