class AddCourseTypeToCourse < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :course_type, :string
  end
end
