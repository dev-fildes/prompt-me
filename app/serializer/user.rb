class UserSerializer < ActiveModel::Serializer
  attributes :id,
  :email,
  :profile_photo,
  :username

  def currentUser
    current_user
  end
end
