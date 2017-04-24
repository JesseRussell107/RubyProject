class Plan < ApplicationRecord
	belongs_to :user
	has_many :terms
end
