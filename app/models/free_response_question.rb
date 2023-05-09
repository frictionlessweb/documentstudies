class FreeResponseQuestion < ApplicationRecord
  has_one :question, as: :question_type
end
