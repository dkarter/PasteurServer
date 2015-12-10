class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.column :email, :string, null: false
      t.column :username, :string, null: false, unique: true
      t.column :password, :string, null: false
      t.timestamps null: false

      t.index :username, unique: true
    end
  end
end
