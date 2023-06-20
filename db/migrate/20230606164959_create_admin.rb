class CreateAdmin < ActiveRecord::Migration[7.0]
  def up
    password = ENV['ADOBE_PRODUCTION_PASSWORD']
    Admin.create!(name: 'Adobe Internal', email: 'production@adobe.com',
                  password:)
  end

  def down
    Admin.find_by(name: 'Adobe Internal').destroy!
  end
end
