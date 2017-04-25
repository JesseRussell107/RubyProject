class AdminController < ApplicationController
  before_action :authenticate_user!
  
  # GET /admin
  # GET /admin.json
  def index
    if not current_user.role? :admin
      redirect_to root_path
    end
  end
end
