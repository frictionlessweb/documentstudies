class Api::V1::DocumentsController < ApplicationController
  before_action :authenticate_admin!

  def upload_file
    render json: { "hello" => "world" }
  end
end
