Rails.application.routes.draw do

  # Serving our SPA
  root "home#index"
  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? and request.format.html?
  end
end
