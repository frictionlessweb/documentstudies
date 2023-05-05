class InitSchema < ActiveRecord::Migration[7.0]
  def up
    enable_extension 'pgcrypto'
    create_table :users, id: :uuid do |t|
      t.timestamps
    end
    create_table :studies, id: :uuid do |t|
      t.timestamps
    end
    create_table :questions, id: :uuid do |t|
      t.timestamps
    end
    create_table :documents, id: :uuid do |t|
      t.timestamps
    end
  end
  def down
    drop_table :users
    drop_table :studies
    drop_table :questions
    drop_table :documents
    disable_extension 'pgcrypto'
  end
end
