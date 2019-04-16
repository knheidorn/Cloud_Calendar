class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer :user_id
      t.string :title
      t.text :description
      t.datetime :date
      t.boolean :w_internal_meeting, :default => false
      t.boolean :w_client_meeting, :default => false
      t.boolean :w_party, :default => false
      t.boolean :networking, :default => false
      t.boolean :p_meeting, :default => false
      t.boolean :p_party, :default => false
      t.boolean :p_wellness, :default => false
      t.boolean :s_reminder, :default => false
      t.boolean :all_day_reminder, :default => false
      t.boolean :birthday, :default => false

      t.timestamps
    end
  end
end
