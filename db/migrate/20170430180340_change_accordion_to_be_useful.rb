class ChangeAccordionToBeUseful < ActiveRecord::Migration[5.0]
  def change
    remove_column  :accordion, :inane_drivel, :string
    add_foreign_key :courses, :course_id
  end
end
