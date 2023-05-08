class CreateQuestions < ActiveRecord::Migration[7.0]
  def up
    create_table :questions, id: :uuid do |t|
      t.string :name, null: false
      t.references :question_type, polymorphic: true
      t.timestamps
    end

    create_table :free_response_questions, id: :uuid do |t|
      t.references :question, index: true, null: false
      t.string :text, null: false
      t.timestamps
    end
  end

  def down
    drop_table :questions
    drop_table :free_response_questions
  end
end
