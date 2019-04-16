class EventSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :date, :w_internal_meeting, :w_client_meeting, :w_party, :networking, :p_meeting, :p_party, :p_wellness, :s_reminder, :all_day_reminder, :birthday
end
