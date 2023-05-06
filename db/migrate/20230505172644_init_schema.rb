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

    # Participants are people who are involved with the study.
    create_table :participants, id: :uuid do |t|
      t.timestamps
    end

    create_table :documents, id: :uuid do |t|
      t.string :name, null: false
      t.timestamps
    end
    create_table :studies, id: :uuid do |t|
      t.timestamps
    end
    create_table :questions, id: :uuid do |t|
      t.timestamps
    end
    create_table :question_set, id: :uuid do |t|
      t.timestamps
    end
  end
  def down
    drop_table :studies
    drop_table :questions
    drop_table :documents
    drop_table :question_set
    drop_table :admins
    drop_table :participants
    disable_extension 'pgcrypto'
  end
end
