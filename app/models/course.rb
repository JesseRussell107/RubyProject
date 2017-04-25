class Course < ApplicationRecord
    has_many :terms, through: :term_courses
    has_many :term_courses

end
