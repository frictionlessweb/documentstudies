class Api::V1::StudiesController < ApplicationController
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

  def delete
    Study.find(delete_params[:id]).destroy!
  end

  def create
    study = Study.create!(schema: params[:schema])
    render json: study
  end

  def completed
    assignments = StudyAssignment.where(study_id: completed_params[:study_id], is_complete: true)
    render json: assignments
  end

  private

  def completed_params
    params.permit(:study_id)
  end

  def delete_params
    params.permit(:id)
  end
end
