class ApplicationController < ActionController::Base
  def after_sign_in_path_for(_resource)
    '/admins'
  end

  if Rails.env.test?
    before_action do
      ActiveStorage::Current.url_options = { protocol: request.protocol, host: request.host, port: request.port }
    end
  end
end
