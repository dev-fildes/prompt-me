class Api::V1::ReviewsController < ApplicationController

  def index
    post = Post.find(params[:post_id])
    reviews = post.reviews
    render json: reviews.order('created_at DESC')
  end

end
