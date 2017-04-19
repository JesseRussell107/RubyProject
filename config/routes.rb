Rails.application.routes.draw do
  resources :plans
  devise_for :users, :controllers => {:registrations => 'registrations'}
  root 'plans#index'
  # match '/show' => 'plans#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
