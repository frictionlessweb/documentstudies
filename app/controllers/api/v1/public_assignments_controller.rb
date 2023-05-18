class Api::V1::PublicAssignmentsController < ApplicationController
  def by_id
    assignment = StudyAssignment.find_by(id: by_id_params[:assignment_id])
    render json: assignment
  end

  def read_document
    doc = Document.find_by(name: document_name_params[:document_name])
    render json: { url: doc.file.blob.url } # rails_blob_url(doc.file.blob) }
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
end
