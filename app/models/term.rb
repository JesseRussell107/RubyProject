class Term < ApplicationRecord
  belongs_to :plan
  has_many :courses
end
