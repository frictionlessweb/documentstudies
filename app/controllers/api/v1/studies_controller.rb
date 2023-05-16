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

  def create
    study = Study.create!(schema: params[:schema])
    render json: {
      id: study.id.to_s,
      schema: study.schema
    }
  end
end
