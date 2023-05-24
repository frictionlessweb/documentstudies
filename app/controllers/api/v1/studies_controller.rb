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
    Study.create!(schema: params[:schema])
  end

  private

  def delete_params
    params.permit(:id)
  end
end
