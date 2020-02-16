class RegistrationsController < Devise::RegistrationsController

  protected

  def update_resource(resource, user_edit_params)
    resource.update_without_password(user_edit_params)
  end

  private
  def user_edit_params
    params(:user).permit(:status, :about, :profile_photo)
  end
end
