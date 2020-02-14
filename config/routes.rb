Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/post/new', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create]
    end
  end
end
