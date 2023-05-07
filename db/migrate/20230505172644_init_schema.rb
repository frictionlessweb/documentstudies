class InitSchema < ActiveRecord::Migration[7.0]
  def up
    enable_extension 'pgcrypto'
    # Administrators are people who are using the application.
    create_table :admins, id: :uuid do |t|
      t.string :name, null: false
      t.string :email, null: false, index: { unique: true }
      t.string :encrypted_password, null: false

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      t.timestamps null: false
    end

    create_table :documents do |t|
      t.string :name, null: false
      t.timestamps
    end
  end

  def down
    drop_table :documents
    drop_table :admins
    disable_extension 'pgcrypto'
  end
end
