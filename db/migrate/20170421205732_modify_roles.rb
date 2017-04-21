class ModifyRoles < ActiveRecord::Migration[5.0]
  def change
    change_column_default :users, :role, from: "", to: ""
  end
end
