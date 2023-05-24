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
      render json: {
        id: study.id.to_s,
        schema: study.schema
      }
    else
      render json: { error: study.errors.to_a.first }
    end
  end

  private

  def delete_params
    params.permit(:id)
  end
end
