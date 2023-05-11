class CreateQuestions < ActiveRecord::Migration[7.0]
  def up
    create_table :questions do |t|
      t.string :name, null: false
      t.string :instructions, null: false
      t.references :question_type, index: true, polymorphic: true
      t.timestamps
    end

    create_table :free_response_questions do |t|
      t.string :text, null: false
      t.timestamps
    end
  end

  def down
    drop_table :questions
    drop_table :free_response_questions
  end
end
