Rails.application.routes.draw do
  devise_for :admins

  # API Routes
  namespace :api do
    namespace :v1 do
      post 'upload-file', to: 'documents#upload_file'
    end
  end

  # Serving our SPA
  root "home#index"

  get '/admins', to: 'admin#index'
  get '/admins/*all', to: 'admin#index', constraints: ->(request) do
    !request.xhr? and request.format.html?
  end
  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? and request.format.html?
  end
end
