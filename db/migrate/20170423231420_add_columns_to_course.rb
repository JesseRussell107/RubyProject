class AddColumnsToCourse < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :course_id, :string
    add_column :courses, :credits, :integer
    add_column :courses, :year, :integer
    add_column :courses, :semester, :string
  end
end
