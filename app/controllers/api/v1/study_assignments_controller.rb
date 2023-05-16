class Api::V1::StudyAssignmentsController < ApplicationController
  before_action :authenticate_admin!

  def all
    assignments = StudyAssignemnt.includes(:study).all.map do |assignment|
      {
        id: assignment.id.to_s,
        study_id: assignment.study_id.to_s,
        group: assignment.group.to_s,
        results: assignment.results
      }
    end
    render json: documents
  end

  def create
    assignment = Document.create!(study_id: create_params[:study_id], group: create_params[:group],
                                  results: create_params[:results])
    render json: {
      id: assignment.id.to_s,
      study_id: assignment.study_id.to_s,
      group: assignment.group.to_s,
      results: assignment.results
    }
  end

  private

  def create_params
    params.permit(:study_id, :group, :results)
  end
end
