class AddNewTableAccordion < ActiveRecord::Migration[5.0]
  def change
    create_table :accordion do |t|
      t.string :title
      t.string :inane_drivel
      t.timestamps 
    end
  end
end
