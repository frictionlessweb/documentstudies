class CreateUsers < ActiveRecord::Migration[7.0]
  def up
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false, unique: true
      t.integer :role, null: false, default: 0
      t.string :password_digest
      t.timestamps
    end
  end
  def down
    drop_table :users
  end
end
