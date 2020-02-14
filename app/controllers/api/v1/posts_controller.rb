class Api::V1::PostsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    posts = Post.all
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = Post.new(post_params)
    post.user = current_user
    posts = Post.all
    if post.save
      render json: post
    else
      render json: post.errors.full_messages
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
