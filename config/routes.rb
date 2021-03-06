Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/new', to: 'homes#index'
  get '/profile', to: 'homes#index'
  get '/users/edit', to: 'homes#index'
  get '/profile/:id', to: 'homes#index'
  get '/posts/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        resources :reviews, only: [:index, :create, :update, :destroy]
      end
        resources :prompts, only: [:index]
      resource :profile, only: [:index, :show]
    end
  end
end
