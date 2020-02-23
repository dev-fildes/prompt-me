class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :current_user, :user_id
end
