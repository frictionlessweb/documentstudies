class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_admin!

  def all
    questions = Question.all.map do |q|
      {
        id: q.id.to_s, 
        name: q.name,
        instructions: q.instructions,
        type: q.question_type.class.name,
      }
    end
    render json: questions
  end

  def create
    create_params[:questions].each do |question_param|
      klass = question_param[:question_type].delete(:kind)
      question_type = klass.constantize.create!(question_param[:question_type])
      Question.create!(name: question_param[:name],
                       instructions: question_param[:instructions],
                       question_type: question_type)
    end
    render json: {success: true}
  end

  private

  def create_params
    params.permit(questions: [:name, :instructions, question_type: [:kind, :text]])
  end
end
