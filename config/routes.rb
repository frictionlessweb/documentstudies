Rails.application.routes.draw do
  devise_for :admins

  # API Routes
  namespace :api do
    namespace :v1 do
      get 'all-documents', to: 'documents#all'
      post 'create-document', to: 'documents#create'

      get 'all-studies', to: 'studies#all'
      post 'create-study', to: 'studies#create'

      get 'all-study-assignments', to: 'study_assignments#all'
      post 'create-study-assignment', to: 'study_assignments#create'

      get 'all-questions', to: 'questions#all'
      post 'create-questions', to: 'questions#create'
    end
  end

  # Serving our SPA
  root 'home#index'

  get '/admins', to: 'admin#index'
  get '/admins/*all', to: 'admin#index', constraints: lambda { |request|
    !request.xhr? and request.format.html?
  }
  get '*path', to: 'home#index', constraints: lambda { |request|
    !request.xhr? and request.format.html?
  }
end
