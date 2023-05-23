Rails.application.routes.draw do
  devise_for :admins

  # API Routes
  namespace :api do
    namespace :v1 do
      get 'all-documents', to: 'documents#all'
      post 'create-document', to: 'documents#create'

      get 'all-studies', to: 'studies#all'
      post 'create-study', to: 'studies#create'
      delete 'delete-study', to: 'studies#delete'

      get 'all-study-assignments', to: 'study_assignments#all'
      post 'create-study-assignment', to: 'study_assignments#create'

      get 'all-questions', to: 'questions#all'
      post 'create-questions', to: 'questions#create'

      get 'assignment-by-id', to: 'public_assignments#by_id'
      put 'update-assignment', to: 'public_assignments#update'
      get 'document-by-name', to: 'public_assignments#read_document'
      get 'study-by-id', to: 'public_assignments#study_by_id'
      post 'create-study-assignment-public', to: 'public_assignments#create'
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
