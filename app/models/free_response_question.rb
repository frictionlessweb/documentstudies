class FreeResponseQuestion < ApplicationRecord
  belongs_to :questions, polymorphic: true, class_name: 'Question'
end
