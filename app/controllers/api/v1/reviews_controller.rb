class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

  def index
    post = Post.find(params[:post_id])
    reviews = post.reviews
    render json: reviews.order('created_at DESC')
  end

  def create
    post = Post.find(params[:post_id])
    if user_signed_in?
      review = Review.new(review_params)
      review.post = post
      review.user = current_user

      if review.save
        render json: review
      else
        render json: review.errors.full_messages
      end
    else
      render json: false
    end
  end

  def update
    review = Review.find(params[:id])
    review.assign_attributes(review_params)

    if review.save
      render json: review
    else
      render json: review.errors.full_messages
    end
  end

  def destroy
    review = Review.find(params[:id])
    post = review.post
    review.destroy
    render json: post
  end

  private
  def review_params
    params.require(:review).permit(:body, :user)
  end
end
