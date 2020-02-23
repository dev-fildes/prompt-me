class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :current_user, :user, :reviews

   has_many :reviews, each_serializer: ReviewSerializer

  def reviews
    object.reviews.order('created_at DESC')
  end
end
