class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :number
      t.integer :year
      t.string :term
      t.integer :credits

      t.timestamps
    end
  end
end
