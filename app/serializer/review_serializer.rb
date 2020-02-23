class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :user 

  belongs_to :user, serializer: UserSerializer
  belongs_to :post, serializer: PostSerializer

end
