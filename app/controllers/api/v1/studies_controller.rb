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
    study = Study.new(schema: params[:schema])
    if study.save
      render json: study
    elsif study.errors[:missing_document_id]
      missing_doc = study.errors[:missing_document_id][0]
      render json: { error_message: "Study not created: #{missing_doc}" }, status: 422
    else
      render json: { error_message: 'An unexpected error occurred. Please refresh the page and try again.' },
             status: 422
    end
  end

  def completed
    assignments = StudyAssignment.where(study_id: completed_params[:study_id])
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
