class AdminController < ApplicationController
  def index
    @admin = current_admin
  end
end
