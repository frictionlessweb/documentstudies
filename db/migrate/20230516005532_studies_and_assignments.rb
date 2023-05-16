class StudiesAndAssignments < ActiveRecord::Migration[7.0]
  def up
    create_table :studies, id: :uuid do |t|
      t.json :schema, null: false
    end
    create_table :study_assignments, id: :uuid do |t|
      t.references :study, null: false
      t.string :group, null: false
      t.json :results, null: false
    end
  end

  def down
    drop_table :studies
    drop_table :study_assignments
  end
end
