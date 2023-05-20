class Api::V1::PublicAssignmentsController < ApplicationController
  def by_id
    assignment = StudyAssignment.find_by(id: by_id_params[:assignment_id])
    render json: assignment
  end

  def study_by_id
    study = Study.find(study_id_params[:study_id])
    render json: study
  end

  def read_document
    doc = Document.find_by(name: document_name_params[:document_name])
    render json: { url: rails_blob_url(doc.file.blob) }
  end

  def create
    study = Study.find(create_params[:study_id])
    assignment = StudyAssignment.create!(study:, group: create_params[:group],
                                         results: study.schema)
    render json: {
      id: assignment.id.to_s,
      study_id: assignment.study_id.to_s,
      group: assignment.group.to_s,
      results: assignment.results
    }
  end

  def update
    assignment = StudyAssignment.find_by!(id: update_params[:assignment_id])
    assignment.update!(results: update_params[:results])
    render json: assignment
  end

  private

  def document_name_params
    params.permit(:document_name)
  end

  def update_params
    params.permit(:assignment_id, results: {})
  end

  def by_id_params
    params.permit(:assignment_id)
  end

  def create_params
    params.permit(:study_id, :group)
  end

  def study_id_params
    params.permit(:study_id)
  end
end
