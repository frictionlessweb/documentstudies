class InitSchema < ActiveRecord::Migration[7.0]
  def up
    enable_extension 'pgcrypto'
    # Administrators are people who are using the application.
    create_table :admins, id: :uuid do |t|
      t.string :name, null: false
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false
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
