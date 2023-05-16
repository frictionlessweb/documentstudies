class UniqueFileNames < ActiveRecord::Migration[7.0]
  def up
    add_index :documents, :name, unique: true, name: 'unique_document_names'
  end
  def down
    remove_index :documents, name: 'unique_document_names'
  end
end
