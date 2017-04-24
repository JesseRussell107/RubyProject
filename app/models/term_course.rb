class TermCourse < ApplicationRecord
  belongs_to :term
  belongs_to :course
  has_many :courses
end
