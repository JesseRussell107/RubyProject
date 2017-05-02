Rails.application.routes.draw do
  resources :plans do
    member do
      post 'deleteCourse'
      post 'addCourse'
      post 'addTerm'
      post 'deleteTerm'
    end
  end
  resources :admin
  devise_for :users, :controllers => {:registrations => 'registrations'}
  root 'plans#index'

  #match ':controller/:action/:id/deleteCourse', :via => :post
  #match ':controller/:action/:id/addCourse', :via => :post
  # match '/show' => 'plans#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
