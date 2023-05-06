class Api::V1::DocumentsController < ApplicationController
  def upload_file
    render json: { "hello" => "world" }
  end
end
