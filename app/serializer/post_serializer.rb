class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :currentUser, :user

  def currentUser
    current_user
  end
end
