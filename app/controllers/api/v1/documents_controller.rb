class Api::V1::DocumentsController < ApplicationController
  before_action :authenticate_admin!

  def all
    documents = Document.includes(:file_attachment).all.map do |doc|
      {
        id: doc.id.to_s,
        name: doc.name,
        url: rails_blob_url(doc.file.blob)
      }
    end
    render json: documents
  end

  def create
    document = Document.create!(name: create_params[:name], file: create_params[:file])
    render json: { id: document.id.to_s, name: document.name, url: rails_blob_url(document.file.blob) }
  end

  private

  def create_params
    params.permit(:name, :file)
  end
end
