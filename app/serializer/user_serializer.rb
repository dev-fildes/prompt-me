class UserSerializer < ActiveModel::Serializer
  attributes :id,
  :admin,
  :email,
  :profile_photo,
  :username
end
