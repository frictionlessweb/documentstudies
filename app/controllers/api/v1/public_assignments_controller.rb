class Api::V1::PublicAssignmentsController < ApplicationController
  def by_id
    assignment = StudyAssigment.find_by(id: by_id_params[:assignment_id])
    render json: assignment
  end

  private

  def by_id_params
    params.permit(:assignment_id)
  end
end
