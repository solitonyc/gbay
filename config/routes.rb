Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  post 'authenticate', to: 'authentication#authenticate'
  post 'user_token' => 'user_token#create'
  get 'users/new', to: 'user#create'
  resources :users do
    resources :clubs
  end
  resources :clubs
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
