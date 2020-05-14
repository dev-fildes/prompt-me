class UsersController < ApplicationController
  def index
    current = current_user
    users = User.all
    render json: users
  end
end
