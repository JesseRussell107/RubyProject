class RemoveColumnsFromCourses < ActiveRecord::Migration[5.0]
  def change
    remove_column :courses, :year
    remove_column :courses, :semester
  end
end
