class Api::V1::StudyAssignmentsController < ApplicationController
  before_action :authenticate_admin!

  def all
    studies = Study.all.map do |assignment|
      {
        id: assignment.id.to_s,
        schema: assignment.schema
      }
    end
    render json: studies
  end

  def create
    study = Study.create!(schema: create_params[:schema])
    render json: {
      id: assignment.id.to_s,
      schema: study.schema
    }
  end

  private

  def create_params
    params.permit(:id, :schema)
  end
end
