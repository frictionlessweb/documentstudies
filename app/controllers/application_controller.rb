class ApplicationController < ActionController::Base
  before_action :set_admin

  def after_sign_in_path_for(_resource); 
    '/admins'
  end

  private

  def set_admin
    @admin = current_admin
  end
end
