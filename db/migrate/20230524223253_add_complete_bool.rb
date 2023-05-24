class AddCompleteBool < ActiveRecord::Migration[7.0]
  def up
    add_column :study_assignments, :is_complete, :boolean, default: false
    StudyAssignment.update_all(is_complete: false)
    change_column_null :study_assignments, :is_complete, false
  end

  def down
    remove_column :study_assignments, :is_complete
  end
end
