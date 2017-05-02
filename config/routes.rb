Rails.application.routes.draw do
  resources :plans, :admin
  devise_for :users, :controllers => {:registrations => 'registrations'}
  root 'plans#index'
  match 'plans/:id/deleteCourse' => 'plans#deleteCourse', :via => :post
  match 'plans/:id/addCourse' => 'plans#deleteCourse', :via => :post
  # match '/show' => 'plans#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
