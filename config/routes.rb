Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'users/sessions' }

  get '/new', to: 'homes#index'
  get '/profile', to: 'homes#index'
  get '/users/edit', to: 'homes#index'
  get '/posts/:id', to: 'homes#index'
  get '/profile/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
        resources :prompts, only: [:index]
      resource :profile, only: [:index, :show]
    end
  end
end
