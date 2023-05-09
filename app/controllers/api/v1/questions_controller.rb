class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_admin!

  def create
    render json: {success: true}
  end

  private

  def create_params
  end
end
