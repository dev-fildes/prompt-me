class Api::V1::PostsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    posts = Post.all
    render json: posts.order('created_at DESC')
  end

  def show
    post = Post.find(params[:id])
    render json: Post.all.order('created_at DESC')
  end

  def create
    post = Post.new(post_params)
    post.user = current_user
    posts = Post.all
    if post.save
      render json: post.order('created_at DESC')
    else
      render json: post.errors.full_messages
    end
  end

  def update
    post = Post.find(params[:id])
    post.assign_attributes(post_params)

    if post.save
      render json: post
    else
      render json: post.errors.full_messages
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render json: post
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
