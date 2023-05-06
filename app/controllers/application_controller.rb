class ApplicationController < ActionController::Base
  before_action :set_admin

  private

  def set_admin
    @admin = current_admin
  end
end
