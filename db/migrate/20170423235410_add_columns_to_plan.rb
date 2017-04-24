class AddColumnsToPlan < ActiveRecord::Migration[5.0]
  def change
    add_column :plans, :startyear, :int
  end
end
