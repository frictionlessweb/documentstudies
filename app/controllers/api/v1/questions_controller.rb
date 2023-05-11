class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_admin!

  def all
    questions = Question.all.map do |q|
      {
        id: "#{q.id}",
        name: q.name,
        instructions: q.instructions,
        type: q.question_type.class.name
      }
    end
    render json: questions
  end

  def create
    created = []
    create_params[:questions].each do |question_param|
      klass = question_param[:question_type].delete(:type)
      question_type = klass.constantize.create!(question_param[:question_type])
      new_question = Question.create!(name: question_param[:name],
                                      instructions: question_param[:instructions],
                                      question_type:)
      created << { id: new_question.id, name: new_question.name, instructions: new_question.instructions,
                   type: new_question.question_type.class.name }
    end
    render json: created
  end

  private

  def create_params
    params.permit(questions: [:name, :instructions, { question_type: %i[type text] }])
  end
end
