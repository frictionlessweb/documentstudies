# We want to get rid of all the old data in this migration, so the simplest
# path is to just drop the table and recreate it.

class FixCreatedAt < ActiveRecord::Migration[7.0]
  def up
    drop_table :study_assignments
    create_table :study_assignments, id: :uuid do |t|
      t.references :study, null: false, type: :uuid
      t.string :group, null: false
      t.json :results, null: false
      t.timestamps
    end
  end
  def down
    drop_table :study_assignments
    create_table :study_assignments, id: :uuid do |t|
      t.references :study, null: false
      t.string :group, null: false
      t.json :results, null: false
    end
  end
end
