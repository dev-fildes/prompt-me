class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :currentUser, :user_id
  
  def currentUser
    current_user
  end
end
